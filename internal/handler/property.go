package handler

import (
	"strconv"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/service"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/response"
	"github.com/gin-gonic/gin"
)

type PropertyHandler interface {
	GetAll(c *gin.Context)
	GetByID(c *gin.Context)
	GetImages(c *gin.Context)
	GetFacilities(c *gin.Context)
	Delete(c *gin.Context)
}

type propertyHandler struct {
	propertyService service.PropertyService
}

func NewPropertyHandler(propertyService service.PropertyService) PropertyHandler {
	return &propertyHandler{propertyService: propertyService}
}

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

// DELETE /api/property/:id
func (h *propertyHandler) Delete(c *gin.Context) {
	id, err := parsePropertyID(c)
	if err != nil {
		response.ValidationError(c, "Invalid property ID")
		return
	}

	if err := h.propertyService.Delete(id); err != nil {
		response.NotFound(c, err.Error())
		return
	}
	response.OK(c, "Property deleted successfully", nil)
}

// Helper

func parsePropertyID(c *gin.Context) (uint, error) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		return 0, err
	}
	return uint(id), nil
}
