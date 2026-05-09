package dto

type CreateWishlistRequest struct {
	PropertyID uint `json:"property_id" binding:"required"`
	UserID     uint `json:"user_id" binding:"required"`
}
