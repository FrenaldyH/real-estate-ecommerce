package model

import (
	"time"

	"gorm.io/gorm"
)

type (
	ListingType    string
	PropertyStatus string
	PaymentMethod  string
)

const (
	ListingTypeSell ListingType = "dijual"
	ListingTypeRent ListingType = "disewa"

	StatusAvailable PropertyStatus = "available"
	StatusSold      PropertyStatus = "sold"
	StatusRented    PropertyStatus = "rented"
	StatusInactive  PropertyStatus = "inactive"

	PaymentCash         PaymentMethod = "cash"
	PaymentKPR          PaymentMethod = "kpr"
	PaymentCashBertahap PaymentMethod = "cash_bertahap"
	PaymentAll          PaymentMethod = "all"
)

type Property struct {
	ID             uint `gorm:"primaryKey;autoIncrement"                        json:"id"`
	AgentID        uint `gorm:"not null;index"                                  json:"agent_id"`
	PropertyTypeID uint `gorm:"not null;index"                                  json:"property_type_id"`

	Title       string `gorm:"type:varchar(255);not null"                       json:"title"`
	Description string `gorm:"type:text;not null"                               json:"description"`

	Price    float64 `gorm:"type:decimal(17,2);not null"                      json:"price"`
	Address  string  `gorm:"type:varchar(255);not null"                       json:"address"`
	City     string  `gorm:"type:varchar(100);not null;index"                 json:"city"`
	Province string  `gorm:"type:varchar(100);not null;index"                 json:"province"`

	ListingType   ListingType    `gorm:"type:varchar(20);not null;index"                  json:"listing_type"`
	Status        PropertyStatus `gorm:"type:varchar(20);not null;default:'available';index" json:"status"`
	PaymentMethod PaymentMethod  `gorm:"type:varchar(20);not null"                        json:"payment_method"`
	IsNegotiable  bool           `gorm:"not null;default:false"                           json:"is_negotiable"`

	FacingDirection *string `gorm:"type:varchar(20);default:null"                    json:"facing_direction,omitempty"`
	HasCarAccess    bool    `gorm:"not null;default:false"                           json:"has_car_access"`
	ElectricalPower int     `gorm:"not null;default:0"                               json:"electrical_power"`

	NOP_PBB string `gorm:"type:char(18);not null;uniqueIndex"               json:"nop_pbb"`
	IMB_PBB bool   `gorm:"column:imb_pbb;not null;default:false"            json:"imb_pbb"`

	CreatedAt time.Time      `gorm:"autoCreateTime"                                   json:"created_at"`
	DeletedAt gorm.DeletedAt `gorm:"index"                                            json:"deleted_at,omitempty"`

	// Relations
	Agent        Agent              `gorm:"foreignKey:AgentID"          json:"agent,omitempty"`
	PropertyType PropertyType       `gorm:"foreignKey:PropertyTypeID"   json:"property_type,omitempty"`
	Images       []PropertyImage    `gorm:"foreignKey:PropertyID"       json:"images,omitempty"`
	Facilities   []PropertyFacility `gorm:"foreignKey:PropertyID"       json:"facilities,omitempty"`
	Reviews      []Review           `gorm:"foreignKey:PropertyID"       json:"reviews,omitempty"`
	Wishlists    []Wishlist         `gorm:"foreignKey:PropertyID"       json:"wishlists,omitempty"`
}

func (Property) TableName() string {
	return "properties"
}
