package service

import (
	"errors"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/dto/request"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/dto/response"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/repository"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
	"gorm.io/gorm"
)

// Interface

type AgentService interface{}

// Implement

type agentService struct {
	repo     repository.AgentRepository
	userRepo repository.UserRepository
	db       *gorm.DB
}

func NewAgentService(repo repository.AgentRepository, userRepo repository.UserRepository, db *gorm.DB) AgentService {
	return &agentService{repo: repo, userRepo: userRepo, db: db}
}

// Helper

func toAgentResponse(a *model.Agent) *response.AgentResponse {
	res := &response.AgentResponse{
		ID:                  a.ID,
		UserID:              a.UserID,
		BioDescription:      a.BioDescription,
		AgencyID:            a.AgencyID,
		TotalPropertiesSold: a.TotalPropertiesSold,
		SIUP4:               a.SIUP4,
		CreatedAt:           a.CreatedAt,
		User:                *modelToUserResponse(&a.User),
	}

	if a.Agency != nil {
		agencyRes := toAgencyResponse(a.Agency)
		res.Agency = agencyRes
	}

	return res
}

// Method

func (s *agentService) CreateAgent(userID uint, req request.CreateAgentRequest) (*response.AgentResponse, error) {
	user, err := s.userRepo.FindByID(userID)
	if err != nil {
		logger.Log.Info("User not found", err)
		return nil, errors.New("User not found")
	}

	if user.IsAgent() {
		logger.Log.Info("User already has been agent")
		return nil, errors.New("User already has been agent")
	}

	if req.SIUP4 != nil {
		exist, _ := s.repo.FindBySIUP4(userID)
		if exist != nil {
			logger.Log.Info("SIUP4 already registered")
			return nil, errors.New("SIUP4 already registered")
		}
	}

	var agent *model.Agent

	err = s.db.Transaction(func(tx *gorm.DB) error {
		agent = &model.Agent{
			UserID:         userID,
			BioDescription: req.BioDescription,
			AgencyID:       req.AgencyID,
			SIUP4:          req.SIUP4,
		}

		if err := tx.Create(agent).Error; err != nil {
			return err
		}

		// Update role user menjadi agent
		return tx.Model(user).Update("role", model.RoleAgent).Error
	})
	if err != nil {
		logger.Log.Info("Failed switch to role agent")
		return nil, errors.New("Failed switch to role agent")
	}

	agentFull, _ := s.repo.FindByID(agent.ID)
	return toAgentResponse(agentFull), nil
}

func (s *agentService) FindByID(id uint) (*response.AgentResponse, error) {
	agent, err := s.repo.FindByID(id)
	if err != nil {
		return nil, errors.New("agent tidak ditemukan")
	}
	return toAgentResponse(agent), nil
}

func (s *agentService) FindByUserID(userID uint) (*response.AgentResponse, error) {
	agent, err := s.repo.FindByUserID(userID)
	if err != nil {
		return nil, errors.New("agent tidak ditemukan")
	}
	return toAgentResponse(agent), nil
}

func (s *agentService) FindAll() ([]response.AgentResponse, error) {
	agents, err := s.repo.FindAll()
	if err != nil {
		return nil, errors.New("gagal mengambil data agent")
	}

	var res []dto.AgentResponse
	for _, a := range agents {
		res = append(res, *toAgentResponse(&a))
	}
	return res, nil
}

func (s *agentService) FindTopBySold(limit int) ([]response.AgentResponse, error) {
	if limit <= 0 {
		return nil, errors.New("limit harus lebih dari 0")
	}

	agents, err := s.repo.FindByTotalPropertiesSold(limit)
	if err != nil {
		return nil, errors.New("gagal mengambil data agent")
	}

	var res []response.AgentResponse
	for _, a := range agents {
		res = append(res, *toAgentResponse(&a))
	}
	return res, nil
}

func (s *agentService) VerifyAgent(agentID uint, adminID uint) error {
	agent, err := s.repo.FindByID(agentID)
	if err != nil {
		return errors.New("agent tidak ditemukan")
	}

	return s.repo.Update(agent)
}

func (s *agentService) Update(agentID uint, userID uint, req request.UpdateAgentRequest) (*request.AgentResponse, error) {
	agent, err := s.repo.FindByID(agentID)
	if err != nil {
		return nil, errors.New("agent tidak ditemukan")
	}

	// Pastikan hanya agent itu sendiri yang bisa update
	if agent.UserID != userID {
		return nil, errors.New("tidak memiliki akses")
	}

	// Cek SIUP4 duplikat jika diubah
	if req.SIUP4 != nil && (agent.SIUP4 == nil || *req.SIUP4 != *agent.SIUP4) {
		existing, _ := s.repo.FindBySIUP4(*req.SIUP4)
		if existing != nil {
			return nil, errors.New("nomor SIUP4 sudah terdaftar")
		}
		agent.SIUP4 = req.SIUP4
	}

	if req.BioDescription != nil {
		agent.BioDescription = req.BioDescription
	}
	if req.AgencyID != nil {
		agent.AgencyID = req.AgencyID
	}

	if err := s.repo.Update(agent); err != nil {
		return nil, errors.New("gagal mengupdate agent")
	}

	return toAgentResponse(agent), nil
}
