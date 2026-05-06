package dto

import "time"

type AgentResponse struct {
	ID                  uint      `json:"id"`
	UserID              uint      `json:"user_id"`
	AgencyID            *uint     `json:"agency_id,omitempty"`
	BioDescription      *string   `json:"bio_description,omitempty"`
	TotalPropertiesSold int       `json:"total_properties_sold"`
	SIUP4               *string   `json:"siup4,omitempty"`
	CreatedAt           time.Time `json:"created_at"`

	// Nested
	User   UserResponse    `json:"user"`
	Agency *AgencyResponse `json:"agency,omitempty"`
}

type UpdateAgentResponse struct {
	// [FROM USER]
	NIK         string `json:"nik" binding:"required,numeric,len=16"`
	FullName    string `json:"full_name"    binding:"required,min=1,max=100"`
	Email       string `json:"email"        binding:"required,email,max=255"`
	PhoneNumber string `json:"phone_number" binding:"required,min=7,max=20"`

	// [FROM AGENT]
	BioDescription *string `json:"bio_description" binding:"omitempty,min=10,max=1000"`
	AgencyID       *uint   `json:"agency_id"       binding:"omitempty"`
	SIUP4          *string `json:"siup4"           binding:"omitempty,min=5,max=50"`
}
