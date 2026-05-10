package service

import (
	"errors"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/dto"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/repository"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/hash"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
)

// Interface

type AgentService interface {
	CreateAgent(username string, req dto.CreateAgentRequest) (*dto.AgentResponse, error)
	GetAgent(req dto.GetAgentRequest) (*dto.AgentResponse, error)
	TopAgent(req dto.GetTopAgentRequest) ([]dto.AgentResponse, error)
	PutAgent(username string, req dto.UpdateAgentRequest) (*dto.UpdateAgentResponse, error)
	GetAgents() ([]dto.AgentResponse, error)
	DeleteAgent(username string) error
}

// Implement

type agentService struct {
	repo     repository.AgentRepository
	userRepo repository.UserRepository
}

func NewAgentService(repo repository.AgentRepository, userRepo repository.UserRepository) AgentService {
	return &agentService{
		repo:     repo,
		userRepo: userRepo,
	}
}

// Helper

func agentModelToAgentResponse(u *model.Agent) *dto.AgentResponse {
	return &dto.AgentResponse{
		ID:                  u.ID,
		UserID:              u.UserID,
		BioDescription:      u.BioDescription,
		AgencyID:            u.AgencyID,
		SIUP4:               u.SIUP4,
		TotalPropertiesSold: u.TotalPropertiesSold,
		User: dto.UserResponse{
			ID:          u.User.ID,
			NIK:         u.User.NIK,
			FullName:    u.User.FullName,
			Username:    u.User.Username,
			Email:       u.User.Email,
			PhoneNumber: u.User.PhoneNumber,
			CreatedAt:   u.User.CreatedAt,
		},
	}
}

// Method

func (s *agentService) CreateAgent(username string, req dto.CreateAgentRequest) (*dto.AgentResponse, error) {
	// [CEK USERNAME]
	user, _ := s.userRepo.FindByUsername(username)
	if user == nil {
		logger.Log.Info("Username not found")
		return nil, errors.New("Username not found")
	}

	// [CEK SIUP4 DUPLIKAT]
	if req.SIUP4 != nil {
		if existSIUP4, _ := s.repo.FindBySIUP4(*req.SIUP4); existSIUP4 != nil {
			logger.Log.Info("SIUP4 has already exist")
			return nil, errors.New("SIUP4 has already exist")
		}
	}

	// [CEK ID]
	existAgent, _ := s.repo.FindByUserID(user.ID)
	if existAgent != nil {
		logger.Log.Info("user has already an agent")
		return nil, errors.New("user has already an agent")
	}

	agent := &model.Agent{
		UserID:         user.ID,
		BioDescription: req.BioDescription,
		AgencyID:       req.AgencyID,
		SIUP4:          req.SIUP4,
	}

	if err := s.repo.Create(agent); err != nil {
		logger.Log.Error("Failed to create agent")
		return nil, errors.New("Failed to create agent")
	}

	if _, err := s.userRepo.Update(user.ID, map[string]any{"role": model.RoleAgent}); err != nil {
		logger.Log.Error("Failed to update user role to agent")
		return nil, errors.New("Failed to update user role to agent")
	}

	agentFull, err := s.repo.FindByID(agent.ID)
	if err != nil {
		logger.Log.Info("Failed to get agent data")
		return nil, errors.New("Failed to get agent data")
	}

	return agentModelToAgentResponse(agentFull), nil
}

func (s *agentService) GetAgent(req dto.GetAgentRequest) (*dto.AgentResponse, error) {
	// [CEK USERNAME]
	user, _ := s.userRepo.FindByUsername(req.Username)
	if user == nil {
		logger.Log.Info("Username not found")
		return nil, errors.New("Username not found")
	}

	// [CEK AGENT]
	agent, _ := s.repo.FindByUserID(user.ID)
	if agent == nil {
		logger.Log.Info("User is not agent")
		return nil, errors.New("User is not agent")
	}

	return agentModelToAgentResponse(agent), nil
}

func (s *agentService) GetAgents() ([]dto.AgentResponse, error) {
	agents, _ := s.repo.FindAll()
	if len(agents) == 0 {
		logger.Log.Info("No agent found")
		return nil, errors.New("No agent found")
	}

	var res []dto.AgentResponse
	for _, a := range agents {
		res = append(res, *agentModelToAgentResponse(&a))
	}

	return res, nil
}

func (s *agentService) TopAgent(req dto.GetTopAgentRequest) ([]dto.AgentResponse, error) {
	agents, err := s.repo.FindByTotalPropertiesSold(int(req.Limit))
	if err != nil {
		logger.Log.Info("Failed to fetch agents data")
		return nil, errors.New("Failed to fetch agents data")
	}

	if len(agents) == 0 {
		logger.Log.Info("No agent found")
		return nil, errors.New("No agent found")
	}

	var res []dto.AgentResponse
	for _, a := range agents {
		res = append(res, *agentModelToAgentResponse(&a))
	}

	return res, nil
}

func (s *agentService) PutAgent(username string, req dto.UpdateAgentRequest) (*dto.UpdateAgentResponse, error) {
	// [CEK USERNAME]
	user, _ := s.userRepo.FindByUsername(username)
	if user == nil {
		logger.Log.Info("Username not found")
		return nil, errors.New("Username not found")
	}

	// [CEK AGENT]
	agent, _ := s.repo.FindByUserID(user.ID)
	if agent == nil {
		logger.Log.Info("Agent not found")
		return nil, errors.New("Agent not found")
	}

	hashed, _ := hash.HashPassword(req.Password)
	userData := map[string]any{
		"nik":          req.NIK,
		"full_name":    req.FullName,
		"email":        req.Email,
		"phone_number": req.PhoneNumber,
		"password":     hashed,
	}

	agentData := map[string]any{
		"bio_description": req.BioDescription,
		"agency_id":       req.AgencyID,
		"siup4":           req.SIUP4,
	}

	updatedData, err := s.repo.Update(agent.ID, agentData, userData)
	if err != nil {
		return nil, err
	}

	return &dto.UpdateAgentResponse{
		NIK:            updatedData.User.NIK,
		FullName:       updatedData.User.FullName,
		Email:          updatedData.User.Email,
		PhoneNumber:    updatedData.User.PhoneNumber,
		BioDescription: updatedData.BioDescription,
		AgencyID:       updatedData.AgencyID,
		SIUP4:          updatedData.SIUP4,
	}, nil
}

func (s *agentService) DeleteAgent(username string) error {
	user, _ := s.userRepo.FindByUsername(username)
	if user == nil {
		logger.Log.Info("Username not found")
		return errors.New("Username not found")
	}

	agent, _ := s.repo.FindByUserID(user.ID)
	if agent == nil {
		logger.Log.Info("Agent not found")
		return errors.New("Agent not found")
	}

	return s.repo.Delete(agent.ID)
}
