package dto

import "github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"

type UpdateUserRoleRequest struct {
	Role model.UserRole `json:"role" binding:"required,oneof=user agent owner"`
}

type CreateAgentRequest struct {
	BioDescription *string `json:"bio_description" binding:"omitempty,min=10,max=1000"`
	AgencyID       *uint   `json:"agency_id"       binding:"omitempty"`
	SIUP4          *string `json:"siup4"           binding:"omitempty,min=5,max=50"`
}

type GetAgentRequest struct {
	Username string `json:"username" binding:"required,max=50"`
}

type GetTopAgentRequest struct {
	Limit uint `json:"limit" binding:"default=0"`
}

type UpdateAgentRequest struct {
	// [FROM USER]
	NIK         string `json:"nik" binding:"required,numeric,len=16"`
	FullName    string `json:"full_name"    binding:"required,min=1,max=100"`
	Email       string `json:"email"        binding:"required,email,max=255"`
	PhoneNumber string `json:"phone_number" binding:"required,min=7,max=20"`
	Password    string `json:"password" binding:"required,min=8,max=255"`

	// [FROM AGENT]
	BioDescription *string `json:"bio_description" binding:"omitempty,min=10,max=1000"`
	AgencyID       *uint   `json:"agency_id"       binding:"omitempty"`
	SIUP4          *string `json:"siup4"           binding:"omitempty,min=5,max=50"`
}
