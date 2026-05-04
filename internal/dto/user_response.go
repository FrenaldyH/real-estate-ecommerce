package dto

import (
	"time"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
)

type UserResponse struct {
	ID          uint           `json:"id"`
	NIK         string         `json:"nik"`
	Username    string         `json:"username"`
	FullName    string         `json:"full_name"`
	Email       string         `json:"email"`
	PhoneNumber string         `json:"phone_number"`
	Role        model.UserRole `json:"role"`
	CreatedAt   time.Time      `json:"created_at"`
}

type LoginResponse struct {
	Token string       `json:"token"`
	User  UserResponse `json:"user"`
}
