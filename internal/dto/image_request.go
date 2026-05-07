package dto

type CreateImageRequest struct {
	ImageURL  string `json:"image_url"  binding:"required,url"` // Validasi bawaan untuk URL
	IsPrimary bool   `json:"is_primary" binding:"omitempty"`
}
