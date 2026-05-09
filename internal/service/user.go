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

type UserService interface {
	CreateUser(req dto.CreateUserRequest) (*dto.UserResponse, error)
	GetUser(req dto.GetUserRequest) (*dto.UserResponse, error)
	GetUsers() ([]dto.UserResponse, error)
	PutUser(username string, req dto.ModifyUserRequest) (*dto.UserResponse, error)
	DeleteUser(username string) error
}

// Implement

type userService struct {
	repo repository.UserRepository
}

func NewUserService(repo repository.UserRepository) UserService {
	return &userService{repo: repo}
}

// Helper

func userModelToUserResponse(u *model.User) *dto.UserResponse {
	return &dto.UserResponse{
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

func (s *userService) CreateUser(req dto.CreateUserRequest) (*dto.UserResponse, error) {
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

	return userModelToUserResponse(user), nil
}

/* func (s *userService) LoginUser(req dto.LoginRequest) (*dto.LoginResponse, error) {
	// [VALIDASI KEBERADAAN EMAIL]
	user, _ := s.repo.FindByEmail(req.Email)
	if user == nil {
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

	return &dto.LoginResponse{
		Token: token,
		User:  *userModelToUserResponse(user),
	}, nil
} */

func (s *userService) GetUser(req dto.GetUserRequest) (*dto.UserResponse, error) {
	// [CEK USERNAME]
	user, _ := s.repo.FindByUsername(req.Username)
	if user == nil {
		logger.Log.Info("Username not found")
		return nil, errors.New("Username not found")
	}

	return userModelToUserResponse(user), nil
}

func (s *userService) GetUsers() ([]dto.UserResponse, error) {
	users, _ := s.repo.FindAll()
	if len(users) == 0 {
		logger.Log.Info("No user found")
		return nil, errors.New("No user found")
	}

	var res []dto.UserResponse
	for _, a := range users {
		res = append(res, *userModelToUserResponse(&a))
	}

	return res, nil
}

func (s *userService) PutUser(username string, req dto.ModifyUserRequest) (*dto.UserResponse, error) {
	// [CEK USERNAME]
	user, _ := s.repo.FindByUsername(username)
	if user == nil {
		logger.Log.Info("Username not found")
		return nil, errors.New("Username not found")
	}

	data := map[string]any{
		"nik":          req.NIK,
		"full_name":    req.FullName,
		"email":        req.Email,
		"phone_number": req.PhoneNumber,
		"password":     req.Password,
	}

	updatedData, err := s.repo.Update(user.ID, data)
	if err != nil {
		logger.Log.Info("Failed to updated user")
		return nil, err
	}

	return userModelToUserResponse(updatedData), nil
}

func (s *userService) DeleteUser(username string) error {
	user, _ := s.repo.FindByUsername(username)
	if user == nil {
		logger.Log.Info("Username not found")
		return errors.New("Username not found")
	}
	return s.repo.Delete(user.ID)
}
