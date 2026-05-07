package dto

import "github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"

type CreatePropertyRequest struct {
	PropertyTypeID uint    `json:"property_type_id" binding:"required"`
	Title          string  `json:"title"            binding:"required,min=10,max=255"`
	Description    string  `json:"description"      binding:"required,min=20"`
	Price          float64 `json:"price"           binding:"required,gt=0"`
	Address        string  `json:"address"          binding:"required,min=10,max=255"`
	City           string  `json:"city"             binding:"required,min=3,max=100"`
	Province       string  `json:"province"         binding:"required,min=3,max=100"`

	ListingType   model.ListingType   `json:"listing_type"   binding:"required,oneof=dijual disewa"`
	PaymentMethod model.PaymentMethod `json:"payment_method" binding:"required,oneof=cash kpr cash_bertahap all"`

	IsNegotiable    bool    `json:"is_negotiable"    binding:"omitempty"`
	FacingDirection *string `json:"facing_direction" binding:"omitempty,min=2,max=20"`
	HasCarAccess    bool    `json:"has_car_access"   binding:"omitempty"`
	ElectricalPower int     `json:"electrical_power" binding:"omitempty,gte=0"`

	LandSize     int     `json:"land_size"        binding:"required,gte=0"`
	BuildingSize int     `json:"building_size"    binding:"required,gte=0"`
	Floors       int     `json:"floors"           binding:"required,gte=0"`
	Certificate  string  `json:"certificate"      binding:"required,max=3"`
	Furnishing   string  `json:"furnishing"       binding:"required,max=30"`
	YearBuilt    int     `json:"year_built"       binding:"required,gt=1900"`
	IsFeatured   bool    `json:"is_featured"      binding:"omitempty"`
	RentPeriod   *string `json:"rent_period"`

	IMB_PBB bool `json:"imb_pbb" binding:"omitempty"`
}

type CreatePropertyTypeRequest struct {
	Name string `json:"name" binding:"required,min=1,max=50"`
}

type CreatePropertyImageRequest struct {
	ImageURL  string `json:"image_url" binding:"required,url,max=255"`
	IsPrimary bool   `json:"is_primary" binding:"omitempty"`
	SortOrder int    `json:"sort_order" binding:"omitempty,gte=0"`
}

type CreateFacilityRequest struct {
	Name string `json:"name" binding:"required,min=1,max=50"`
}

type CreatePropertyFacilityRequest struct {
	FacilityTypeID uint `json:"facility_type_id" binding:"required"`
	Amount         int  `json:"amount"           binding:"required,gte=1"`
}

type CreatePropertyFacilitiesRequest struct {
	Facilities []CreatePropertyFacilityRequest `json:"facilities" binding:"required,min=1,dive"`
}
