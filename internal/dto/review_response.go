package dto

import "time"

type ReviewResponse struct {
	ID         uint      `json:"id"`
	UserID     uint      `json:"user_id"`
	PropertyID uint      `json:"property_id"`
	Rating     int8      `json:"rating"`
	Comment    *string   `json:"comment,omitempty"`
	CreatedAt  time.Time `json:"created_at"`

	// Nested
	User UserResponse `json:"user"`
}
