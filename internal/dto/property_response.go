package dto

import "github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"

type FacilityTypeResponse struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

type PropertyFacilityResponse struct {
	ID           uint                 `json:"id"`
	FacilityType FacilityTypeResponse `json:"facility_type"`
	Amount       int                  `json:"amount"`
}

type PropertyTypeResponse struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

type PropertyImageResponse struct {
	ID        uint   `json:"id"`
	ImageURL  string `json:"image_url"`
	IsPrimary bool   `json:"is_primary"`
	SortOrder int    `json:"sort_order"`
}

// Response ringkas
type PropertyListResponse struct {
	ID           uint                   `json:"id"`
	Title        string                 `json:"title"`
	Price        float64                `json:"price"`
	City         string                 `json:"city"`
	Province     string                 `json:"province"`
	ListingType  model.ListingType      `json:"listing_type"`
	Status       model.PropertyStatus   `json:"status"`
	PropertyType PropertyTypeResponse   `json:"property_type"`
	PrimaryImage *PropertyImageResponse `json:"primary_image,omitempty"`
}

type PropertyDetailResponse struct {
	ID              uint                 `json:"id"`
	Title           string               `json:"title"`
	Description     string               `json:"description"`
	Price           float64              `json:"price"`
	Address         string               `json:"address"`
	City            string               `json:"city"`
	Province        string               `json:"province"`
	ListingType     model.ListingType    `json:"listing_type"`
	Status          model.PropertyStatus `json:"status"`
	PaymentMethod   model.PaymentMethod  `json:"payment_method"`
	IsNegotiable    bool                 `json:"is_negotiable"`
	FacingDirection *string              `json:"facing_direction,omitempty"`
	HasCarAccess    bool                 `json:"has_car_access"`
	ElectricalPower int                  `json:"electrical_power"`

	LandSize     int    `json:"land_size"`
	BuildingSize int    `json:"building_size"`
	Floors       int    `json:"floors"`
	Certificate  string `json:"certificate"`
	Furnishing   string `json:"furnishing"`
	YearBuilt    int    `json:"year_built"`
	IsFeatured   bool   `json:"is_featured"`
	RentPeriod   string `json:"rent_period,omitempty"`

	ImbPbb bool `json:"imb_pbb"`

	Agent        *AgentResponse             `json:"agent,omitempty"`
	PropertyType *PropertyTypeResponse      `json:"property_type,omitempty"`
	Images       []PropertyImageResponse    `json:"images,omitempty"`
	Facilities   []PropertyFacilityResponse `json:"facilities,omitempty"`
}
