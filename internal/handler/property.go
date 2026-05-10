package handler

import (
	"errors"
	"strconv"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/dto"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/service"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/response"
	"github.com/gin-gonic/gin"
)

// Interface

type PropertyHandler interface {
	GetAll(c *gin.Context)
	GetByID(c *gin.Context)
	GetImages(c *gin.Context)
	GetFacilities(c *gin.Context)
	PostProperty(c *gin.Context)
	PutProperty(c *gin.Context)
	DeleteProperty(c *gin.Context)
	PostPropertyImage(c *gin.Context)
	DeletePropertyImage(c *gin.Context)
	PostFacility(c *gin.Context)
	PutFacility(c *gin.Context)
	DeleteFacility(c *gin.Context)
}

// Implement

type propertyHandler struct {
	propertyService service.PropertyService
}

func NewPropertyHandler(propertyService service.PropertyService) PropertyHandler {
	return &propertyHandler{propertyService: propertyService}
}

// Helper

func getUsernameFromContext(c *gin.Context) (string, error) {
	val, exists := c.Get("username")
	if !exists {
		return "", errors.New("username not found in context")
	}

	username, ok := val.(string)
	if !ok {
		return "", errors.New("invalid username format in context")
	}

	return username, nil
}

func parsePropertyID(c *gin.Context) (uint, error) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		return 0, err
	}
	return uint(id), nil
}

// Method

// GET /api/property?city=&province=&type=&status=&listing-type=&min=&max=
// GET /api/property  (tanpa query param → ambil semua)
func (h *propertyHandler) GetAll(c *gin.Context) {
	// Cek query param satu per satu, pakai yang pertama ditemukan
	if city := c.Query("city"); city != "" {
		res, err := h.propertyService.GetByCity(city)
		if err != nil {
			logger.Log.Info("internal server error")
			response.InternalError(c, err.Error())
			return
		}
		response.OK(c, "Properties fetched by city", res)
		return
	}

	if province := c.Query("province"); province != "" {
		res, err := h.propertyService.GetByProvince(province)
		if err != nil {
			logger.Log.Info("internal server error")
			response.InternalError(c, err.Error())
			return
		}
		response.OK(c, "Properties fetched by province", res)
		return
	}

	if typeName := c.Query("type"); typeName != "" {
		res, err := h.propertyService.GetByType(typeName)
		if err != nil {
			logger.Log.Info("internal server error")
			response.InternalError(c, err.Error())
			return
		}
		response.OK(c, "Properties fetched by type", res)
		return
	}

	if status := c.Query("status"); status != "" {
		res, err := h.propertyService.GetByStatus(status)
		if err != nil {
			logger.Log.Info("internal server error")
			response.InternalError(c, err.Error())
			return
		}
		response.OK(c, "Properties fetched by status", res)
		return
	}

	if listingType := c.Query("listing-type"); listingType != "" {
		res, err := h.propertyService.GetByListingType(listingType)
		if err != nil {
			logger.Log.Info("internal server error")
			response.InternalError(c, err.Error())
			return
		}
		response.OK(c, "Properties fetched by listing type", res)
		return
	}

	minStr, maxStr := c.Query("min"), c.Query("max")
	if minStr != "" && maxStr != "" {
		min, err := strconv.ParseFloat(minStr, 64)
		if err != nil {
			logger.Log.Info("internal server error")
			response.ValidationError(c, "Invalid min price format")
			return
		}
		max, err := strconv.ParseFloat(maxStr, 64)
		if err != nil {
			logger.Log.Info("internal server error")
			response.ValidationError(c, "Invalid max price format")
			return
		}
		res, err := h.propertyService.GetByPriceRange(min, max)
		if err != nil {
			logger.Log.Info("internal server error")
			response.ValidationError(c, err.Error())
			return
		}
		response.OK(c, "Properties fetched by price range", res)
		return
	}

	// Tidak ada query param → ambil semua
	res, err := h.propertyService.GetAll()
	if err != nil {
		response.InternalError(c, err.Error())
		return
	}
	response.OK(c, "All properties fetched", res)
}

// GET /api/property/:id
func (h *propertyHandler) GetByID(c *gin.Context) {
	id, err := parsePropertyID(c)
	if err != nil {
		response.ValidationError(c, "Invalid property ID")
		return
	}

	res, err := h.propertyService.GetByID(id)
	if err != nil {
		response.NotFound(c, err.Error())
		return
	}
	response.OK(c, "Property detail fetched", res)
}

// GET /api/property/:id/images
func (h *propertyHandler) GetImages(c *gin.Context) {
	id, err := parsePropertyID(c)
	if err != nil {
		response.ValidationError(c, "Invalid property ID")
		return
	}

	res, err := h.propertyService.GetImages(id)
	if err != nil {
		response.NotFound(c, err.Error())
		return
	}
	response.OK(c, "Property images fetched", res)
}

// GET /api/property/:id/facility
func (h *propertyHandler) GetFacilities(c *gin.Context) {
	id, err := parsePropertyID(c)
	if err != nil {
		response.ValidationError(c, "Invalid property ID")
		return
	}

	res, err := h.propertyService.GetFacilities(id)
	if err != nil {
		response.NotFound(c, err.Error())
		return
	}
	response.OK(c, "Property facilities fetched", res)
}

func (h *propertyHandler) PostProperty(c *gin.Context) {
	username, err := getUsernameFromContext(c)
	if err != nil {
		logger.Log.Info("Unauthorized")
		response.Unauthorized(c)
	}

	var req dto.CreatePropertyRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		logger.Log.Info("Bad request")
		response.BadRequest(c, err.Error())
		return
	}

	res, err := h.propertyService.CreatePropertyByAgent(username, req)
	if err != nil {
		response.InternalError(c, err.Error())
		return
	}

	response.Created(c, "Property successfully created", res)
}

func (h *propertyHandler) PutProperty(c *gin.Context) {
	username, err := getUsernameFromContext(c)
	if err != nil {
		logger.Log.Info("Unauthorized")
		response.Unauthorized(c)
		return
	}

	id, err := parsePropertyID(c)
	if err != nil {
		response.ValidationError(c, "Invalid property ID")
		return
	}

	var data map[string]any
	if err := c.ShouldBindJSON(&data); err != nil {
		logger.Log.Info("Bad request")
		response.BadRequest(c, err.Error())
		return
	}

	res, err := h.propertyService.UpdatePropertyByAgent(username, id, data)
	if err != nil {
		if err.Error() == "unauthorized: you do not own this property" {
			response.Forbidden(c)
			return
		}
		response.InternalError(c, err.Error())
		return
	}

	response.OK(c, "Property successfully updated", res)
}

func (h *propertyHandler) DeleteProperty(c *gin.Context) {
	username, err := getUsernameFromContext(c)
	if err != nil {
		logger.Log.Info("Unauthorized")
		response.Unauthorized(c)
		return
	}

	id, err := parsePropertyID(c)
	if err != nil {
		response.ValidationError(c, "Invalid property ID")
		return
	}

	err = h.propertyService.DeletePropertyByAgent(username, id)
	if err != nil {
		if err.Error() == "unauthorized: you do not own this property" {
			response.Forbidden(c)
			return
		}
		response.InternalError(c, err.Error())
		return
	}

	response.OK(c, "Property successfully deleted", nil)
}

func (h *propertyHandler) PostPropertyImage(c *gin.Context) {
	username, err := getUsernameFromContext(c)
	if err != nil {
		logger.Log.Info("Unauthorized")
		response.Unauthorized(c)
		return
	}

	id, err := parsePropertyID(c)
	if err != nil {
		response.ValidationError(c, "Invalid property ID")
		return
	}

	var req dto.CreateImageRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		logger.Log.Info("Bad request")
		response.BadRequest(c, err.Error())
		return
	}

	primeStr := c.Query("prime")
	if primeStr == "true" || primeStr == "1" {
		req.IsPrimary = true
	}

	res, err := h.propertyService.CreateImageByAgent(username, id, req)
	if err != nil {
		if err.Error() == "unauthorized: you do not own this property" {
			response.Forbidden(c)
			return
		}
		response.InternalError(c, err.Error())
		return
	}

	response.Created(c, "Image successfully added", res)
}

func (h *propertyHandler) DeletePropertyImage(c *gin.Context) {
	username, err := getUsernameFromContext(c)
	if err != nil {
		logger.Log.Info("Unauthorized")
		response.Unauthorized(c)
		return
	}

	propertyID, err := parsePropertyID(c)
	if err != nil {
		response.ValidationError(c, "Invalid property ID")
		return
	}

	// Parsing manual untuk image_id karena parsePropertyID hanya mencari "id"
	imageIDStr := c.Param("image_id")
	imageID, err := strconv.ParseUint(imageIDStr, 10, 64)
	if err != nil {
		response.ValidationError(c, "Invalid image ID format")
		return
	}

	err = h.propertyService.DeleteImage(username, propertyID, uint(imageID))
	if err != nil {
		if err.Error() == "unauthorized: you do not own this property" {
			response.Forbidden(c)
			return
		}
		response.InternalError(c, err.Error())
		return
	}

	response.OK(c, "Image successfully deleted", nil)
}

func (h *propertyHandler) PostFacility(c *gin.Context) {
	username, err := getUsernameFromContext(c)
	if err != nil {
		response.Unauthorized(c)
		return
	}

	propertyID, err := parsePropertyID(c)
	if err != nil {
		response.ValidationError(c, "Invalid property ID")
		return
	}

	var req dto.CreatePropertyFacilityRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, err.Error())
		return
	}

	res, err := h.propertyService.AddFacility(username, propertyID, req)
	if err != nil {
		if err.Error() == "unauthorized: you do not own this property" {
			response.Forbidden(c)
			return
		}
		response.InternalError(c, err.Error())
		return
	}

	response.Created(c, "Facility added successfully", res)
}

func (h *propertyHandler) PutFacility(c *gin.Context) {
	username, err := getUsernameFromContext(c)
	if err != nil {
		response.Unauthorized(c)
		return
	}

	propertyID, err := parsePropertyID(c)
	if err != nil {
		response.ValidationError(c, "Invalid property ID")
		return
	}

	facilityIDStr := c.Param("facility_id")
	facilityID, err := strconv.ParseUint(facilityIDStr, 10, 64)
	if err != nil {
		response.ValidationError(c, "Invalid facility ID")
		return
	}

	var body struct {
		Amount int `json:"amount" binding:"required,gte=1"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		response.BadRequest(c, err.Error())
		return
	}

	res, err := h.propertyService.UpdateFacility(username, propertyID, uint(facilityID), body.Amount)
	if err != nil {
		if err.Error() == "unauthorized: you do not own this property" {
			response.Forbidden(c)
			return
		}
		response.InternalError(c, err.Error())
		return
	}

	response.OK(c, "Facility updated successfully", res)
}

func (h *propertyHandler) DeleteFacility(c *gin.Context) {
	username, err := getUsernameFromContext(c)
	if err != nil {
		response.Unauthorized(c)
		return
	}

	propertyID, err := parsePropertyID(c)
	if err != nil {
		response.ValidationError(c, "Invalid property ID")
		return
	}

	facilityIDStr := c.Param("facility_id")
	facilityID, err := strconv.ParseUint(facilityIDStr, 10, 64)
	if err != nil {
		response.ValidationError(c, "Invalid facility ID")
		return
	}

	if err := h.propertyService.RemoveFacility(username, propertyID, uint(facilityID)); err != nil {
		if err.Error() == "unauthorized: you do not own this property" {
			response.Forbidden(c)
			return
		}
		response.InternalError(c, err.Error())
		return
	}

	response.OK(c, "Facility deleted successfully", nil)
}
