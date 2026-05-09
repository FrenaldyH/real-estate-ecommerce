package dto

type CreateImageResponse struct {
	ID         uint   `json:"id"`
	PropertyID uint   `json:"property_id"`
	ImageURL   string `json:"image_url"`
	IsPrimary  bool   `json:"is_primary"`
}
