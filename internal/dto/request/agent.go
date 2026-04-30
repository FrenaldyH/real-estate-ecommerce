package request

import "github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"

type UpdateUserRoleRequest struct {
	Role model.UserRole `json:"role" binding:"required,oneof=user agent admin"`
}

type CreateAgentRequest struct {
	BioDescription *string `json:"bio_description" binding:"omitempty,min=10,max=1000"`
	AgencyID       *uint   `json:"agency_id"       binding:"omitempty"`
	SIUP4          *string `json:"siup4"           binding:"omitempty,min=5,max=50"`
}
