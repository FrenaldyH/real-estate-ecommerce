package service

import (
	"errors"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/dto/request"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/dto/response"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/repository"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
)

// Interface

type AgencyService interface {
	Create(req request.CreateAgenciesRequest) (*response.CreateAgencyResponse, error)
	FindByID(id uint) (*response.CreateAgencyResponse, error)
	FindAll() ([]response.CreateAgencyResponse, error)
	Update(id uint, req request.UpdateAgencyRequest) (*response.CreateAgencyResponse, error)
	Delete(id uint) error
}

// Implement

type agencyService struct {
	repo repository.AgencyRepository
}

func toAgencyResponse(a *model.Agency) *response.CreateAgencyResponse {
	return &response.CreateAgencyResponse{
		ID:          a.ID,
		AgencyName:  a.AgencyName,
		Address:     a.Address,
		PhoneNumber: a.PhoneNumber,
		Email:       a.Email,
		NIB:         a.NIB,
	}
}

func NewAgencyRepository(repo repository.AgencyRepository) AgencyService {
	return &agencyService{repo: repo}
}

func (s *agencyService) Create(req request.CreateAgenciesRequest) (*response.CreateAgencyResponse, error) {
	// [CEK DUPLIKAT NIB]
	existNIB, _ := s.repo.FindByNIB(req.NIB)
	if existNIB != nil {
		logger.Log.Info("NIB has been already used")
		return nil, errors.New("NIB sudah terdaftar")
	}

	// [CEK DUPLIKAT EMAIL]
	existEmail, _ := s.repo.FindByEmail(req.Email)
	if existEmail != nil {
		logger.Log.Info("Email has been already used")
		return nil, errors.New("NIB sudah terdaftar")
	}

	agency := &model.Agency{
		AgencyName:  req.AgencyName,
		Address:     req.Address,
		PhoneNumber: req.PhoneNumber,
		Email:       req.Email,
		NIB:         req.NIB,
	}

	if err := s.repo.Create(agency); err != nil {
		logger.Log.Info("Failed create agency")
		return nil, errors.New("Failed create agency")
	}

	return toAgencyResponse(agency), nil
}

func (s *agencyService) FindByID(id uint) (*response.CreateAgencyResponse, error) {
	agency, err := s.repo.FindByID(id)
	if err != nil {
		return nil, errors.New("agency not found")
	}
	return toAgencyResponse(agency), nil
}

func (s *agencyService) FindAll() ([]response.CreateAgencyResponse, error) {
	agencies, err := s.repo.FindAll()
	if err != nil {
		return nil, errors.New("gagal mengambil data agency")
	}

	var res []response.CreateAgencyResponse
	for _, a := range agencies {
		res = append(res, *toAgencyResponse(&a))
	}
	return res, nil
}

func (s *agencyService) Update(id uint, req request.UpdateAgencyRequest) (*response.CreateAgencyResponse, error) {
	agency, err := s.repo.FindByID(id)
	if err != nil {
		return nil, errors.New("agency tidak ditemukan")
	}

	if req.AgencyName != nil {
		agency.AgencyName = *req.AgencyName
	}
	if req.Address != nil {
		agency.Address = *req.Address
	}
	if req.PhoneNumber != nil {
		agency.PhoneNumber = *req.PhoneNumber
	}
	if req.Email != nil {
		agency.Email = *req.Email
	}

	if err := s.repo.Update(agency); err != nil {
		logger.Log.Info("Failed to update agency", err)
		return nil, errors.New("Failed to update agency")
	}

	return toAgencyResponse(agency), nil
}

func (s *agencyService) Delete(id uint) error {
	_, err := s.repo.FindByID(id)
	if err != nil {
		logger.Log.Info("Agency not found", err)
		return errors.New("Agency not found")
	}
	return s.repo.Delete(id)
}
