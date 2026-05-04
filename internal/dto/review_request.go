package dto

type CreateReviewRequest struct {
	Rating  int8    `json:"rating"  binding:"required,min=1,max=5"`
	Comment *string `json:"comment" binding:"omitempty,min=10,max=500"`
}
