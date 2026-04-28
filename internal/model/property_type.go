package model

import (
	"time"

	"gorm.io/gorm"
)

type PropertyType struct {
	ID        uint           `gorm:"primaryKey;autoIncrement"                json:"id"`
	Name      string         `gorm:"type:varchar(50);not null;uniqueIndex"    json:"name"`
	CreatedAt time.Time      `gorm:"autoCreateTime"                           json:"created_at"`
	DeletedAt gorm.DeletedAt `gorm:"index"                                    json:"deleted_at,omitempty"`

	// Relations
	Properties []Property `gorm:"foreignKey:PropertyTypeID" json:"properties,omitempty"`
}

func (PropertyType) TableName() string {
	return "property_types"
}
