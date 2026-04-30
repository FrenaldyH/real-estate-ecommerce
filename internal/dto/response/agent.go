package response

import "time"

type AgentResponse struct {
	ID                  uint       `json:"id"`
	UserID              uint       `json:"user_id"`
	BioDescription      *string    `json:"bio_description,omitempty"`
	AgencyID            *uint      `json:"agency_id,omitempty"`
	TotalPropertiesSold int        `json:"total_properties_sold"`
	SIUP4Number         *string    `json:"siup4_number,omitempty"`
	SIUP4ExpiredAt      *time.Time `json:"siup4_expired_at,omitempty"`
	IsVerified          bool       `json:"is_verified"`
	VerifiedAt          *time.Time `json:"verified_at,omitempty"`
	CreatedAt           time.Time  `json:"created_at"`

	// Nested
	User   UserResponse    `json:"user"`
	Agency *AgencyResponse `json:"agency,omitempty"`
}
