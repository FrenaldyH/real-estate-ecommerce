package service

import (
	"errors"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/dto"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/repository"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/hash"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/jwt"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
)

type AuthService interface {
	Login(req dto.LoginRequest) (*dto.LoginResponse, error)
}

type authService struct {
	userRepo repository.UserRepository
}

func NewAuthService(userRepo repository.UserRepository) AuthService {
	return &authService{userRepo: userRepo}
}

func (s *authService) Login(req dto.LoginRequest) (*dto.LoginResponse, error) {
	// [CARI USERNAME]
	user, err := s.userRepo.FindByUsername(req.Username)
	if err != nil || user == nil {
		logger.Log.Info("Login failed: username not found")
		return nil, errors.New("Invalid username or password")
	}

	if !hash.CheckPassword(user.Password, req.Password) {
		logger.Log.Info("Login failed: wrong password")
		return nil, errors.New("Invalid username or password")
	}

	token, err := jwt.GenerateToken(user.Username, string(user.Role))
	if err != nil {
		logger.Log.Error("Failed to generate token: " + err.Error())
		return nil, errors.New("Failed to process login")
	}

	return &dto.LoginResponse{
		Token: token,
	}, nil
}
