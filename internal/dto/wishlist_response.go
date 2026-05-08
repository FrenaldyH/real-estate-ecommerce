package dto

type WishlistResponse struct {
	ID uint `json:"id"`

	// Nested
	Property PropertyDetailResponse `json:"property"`
	User     UserResponse           `json:"user"`
}
