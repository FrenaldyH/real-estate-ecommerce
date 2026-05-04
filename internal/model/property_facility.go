package model

import (
	"time"

	"gorm.io/gorm"
)

type PropertyFacility struct {
	ID             uint           `gorm:"primaryKey;autoIncrement"    json:"id"`
	FacilityTypeID uint           `gorm:"not null;index;uniqueIndex:idx_property_facility"`
	PropertyID     uint           `gorm:"not null;index;uniqueIndex:idx_property_facility"`
	Amount         int            `gorm:"not null;default:1"          json:"amount"`
	CreatedAt      time.Time      `gorm:"autoCreateTime"              json:"created_at"`
	DeletedAt      gorm.DeletedAt `gorm:"index"                       json:"deleted_at,omitempty"`

	// Relations
	Property     Property     `gorm:"foreignKey:PropertyID"     json:"property,omitempty"`
	FacilityType FacilityType `gorm:"foreignKey:FacilityTypeID" json:"facility_type,omitempty"`
}

func (PropertyFacility) TableName() string {
	return "property_facilities"
}
