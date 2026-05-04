package dto

type CreateWishlistRequest struct {
	PropertyID uint `json:"property_id" binding:"required"`
}
