package model

import (
	"time"

	"gorm.io/gorm"
)

type FacilityType struct {
	ID        uint           `gorm:"primaryKey;autoIncrement"                json:"id"`
	Name      string         `gorm:"type:varchar(50);not null;uniqueIndex"    json:"name"`
	CreatedAt time.Time      `gorm:"autoCreateTime"                           json:"created_at"`
	DeletedAt gorm.DeletedAt `gorm:"index"                                    json:"deleted_at,omitempty"`

	// Relations
	PropertyFacilities []PropertyFacility `gorm:"foreignKey:FacilityTypeID" json:"property_facilities,omitempty"`
}

func (FacilityType) TableName() string {
	return "facility_types"
}
