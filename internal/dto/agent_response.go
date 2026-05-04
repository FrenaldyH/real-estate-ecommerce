package dto

import "time"

type AgentResponse struct {
	ID                  uint      `json:"id"`
	UserID              uint      `json:"user_id"`
	BioDescription      *string   `json:"bio_description,omitempty"`
	AgencyID            *uint     `json:"agency_id,omitempty"`
	TotalPropertiesSold int       `json:"total_properties_sold"`
	SIUP4               *string   `json:"siup4,omitempty"`
	CreatedAt           time.Time `json:"created_at"`

	// Nested
	User   UserResponse    `json:"user"`
	Agency *AgencyResponse `json:"agency,omitempty"`
}
