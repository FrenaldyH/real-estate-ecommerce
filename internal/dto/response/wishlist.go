package response

import "time"

type WishlistResponse struct {
	ID        uint      `json:"id"`
	CreatedAt time.Time `json:"created_at"`

	// Nested
	Property PropertyListResponse `json:"property"`
}
