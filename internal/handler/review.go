package handler

import (
	"strconv"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/dto"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/service"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/response"
	"github.com/gin-gonic/gin"
)

type ReviewHandler struct {
	reviewService service.ReviewService
}

func NewReviewHandler(reviewService service.ReviewService) *ReviewHandler {
	return &ReviewHandler{reviewService: reviewService}
}

// GET /api/property/:id/review
func (h *ReviewHandler) GetReviews(c *gin.Context) {
	propertyID, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		response.BadRequest(c, "property id tidak valid")
		return
	}

	reviews, err := h.reviewService.GetReviewsByProperty(uint(propertyID))
	if err != nil {
		response.InternalError(c, err.Error())
		return
	}

	response.OK(c, "berhasil mengambil data review", reviews)
}

// POST /api/property/:id/review
func (h *ReviewHandler) CreateReview(c *gin.Context) {
	username, err := getUsername(c)
	if err != nil {
		response.Unauthorized(c)
		return
	}

	propertyID, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		response.BadRequest(c, "property id tidak valid")
		return
	}

	var req dto.CreateReviewRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.ValidationError(c, err.Error())
		return
	}

	review, err := h.reviewService.CreateReview(username, uint(propertyID), req)
	if err != nil {
		if err.Error() == "you have already reviewed this property" {
			response.ValidationError(c, err.Error())
			return
		}
		response.InternalError(c, err.Error())
		return
	}

	response.Created(c, "review berhasil dibuat", review)
}

// PUT /api/review/:property_id
func (h *ReviewHandler) UpdateReview(c *gin.Context) {
	username, err := getUsername(c)
	if err != nil {
		response.Unauthorized(c)
		return
	}

	propertyID, err := strconv.ParseUint(c.Param("property_id"), 10, 64)
	if err != nil {
		response.BadRequest(c, "property id tidak valid")
		return
	}

	var req dto.CreateReviewRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.ValidationError(c, err.Error())
		return
	}

	review, err := h.reviewService.UpdateReview(username, uint(propertyID), req)
	if err != nil {
		if err.Error() == "review not found" {
			response.NotFound(c, err.Error())
			return
		}
		response.InternalError(c, err.Error())
		return
	}

	response.OK(c, "review berhasil diperbarui", review)
}

// DELETE /api/review/:property_id
func (h *ReviewHandler) DeleteReview(c *gin.Context) {
	username, err := getUsername(c)
	if err != nil {
		response.Unauthorized(c)
		return
	}

	propertyID, err := strconv.ParseUint(c.Param("property_id"), 10, 64)
	if err != nil {
		response.BadRequest(c, "property id tidak valid")
		return
	}

	if err := h.reviewService.DeleteReview(username, uint(propertyID)); err != nil {
		if err.Error() == "review not found" {
			response.NotFound(c, err.Error())
			return
		}
		response.InternalError(c, err.Error())
		return
	}

	response.OK(c, "review berhasil dihapus", nil)
}
