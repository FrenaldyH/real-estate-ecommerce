package service

import (
	"errors"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/dto/request"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/dto/response"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/repository"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/hash"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/jwt"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
)

// Interface

type UserService interface {
	Register(req request.CreateUserRequest) (*response.UserResponse, error)
	Login(req request.LoginRequest) (*response.LoginResponse, error)
}

// Implement

type userService struct {
	repo repository.UserRepository
}

func NewUserService(repo repository.UserRepository) UserService {
	return &userService{repo: repo}
}

// Helper

func modelToUserResponse(u *model.User) *response.UserResponse {
	return &response.UserResponse{
		ID:          u.ID,
		NIK:         u.NIK,
		Username:    u.Username,
		FullName:    u.FullName,
		Email:       u.Email,
		PhoneNumber: u.PhoneNumber,
		Role:        u.Role,
		CreatedAt:   u.CreatedAt,
	}
}

// Method

func (s *userService) Register(req request.CreateUserRequest) (*response.UserResponse, error) {
	// [CEK EMAIL DUPLIKAT]
	existEmail, _ := s.repo.FindByEmail(req.Email)
	if existEmail != nil {
		logger.Log.Info("Email is already registered")
		return nil, errors.New("Email is already registered")
	}

	// [CEK NIK DUPLIKAT]
	existNIK, _ := s.repo.FindByNIK(req.NIK)
	if existNIK != nil {
		logger.Log.Info("NIK is already registered")
		return nil, errors.New("NIK has already been registered")
	}

	// [HASH PASSWORD]
	hashed, err := hash.HashPassword(req.Password)
	if err != nil {
		return nil, errors.New("Failed hashing password")
	}

	user := &model.User{
		NIK:         req.NIK,
		Username:    req.Username,
		FullName:    req.FullName,
		Email:       req.Email,
		PhoneNumber: req.PhoneNumber,
		Password:    hashed,
		Role:        model.RoleUser,
	}

	if err := s.repo.Create(user); err != nil {
		logger.Log.Error("Failed to create account")
		return nil, errors.New("Failed to registered account")
	}

	return modelToUserResponse(user), nil
}

func (s *userService) Login(req request.LoginRequest) (*response.LoginResponse, error) {
	// [VALIDASI KEBERADAAN EMAIL]
	user, err := s.repo.FindByEmail(req.Email)
	if err != nil {
		logger.Log.Info("Email not found")
		return nil, errors.New("Email or password wrong")
	}

	// [VERIFIKASI PASSWORD]
	if !hash.CheckPassword(user.Password, req.Password) {
		logger.Log.Info("Email or password wrong")
		return nil, errors.New("Email or password wrong")
	}

	// [GENERATE JWT]
	token, err := jwt.GenerateToken(user.ID, string(user.Role))
	if err != nil {
		logger.Log.Info("Failed generate jwt token")
		return nil, errors.New("Token Error")
	}

	return &response.LoginResponse{
		Token: token,
		User:  *modelToUserResponse(user),
	}, nil
}
