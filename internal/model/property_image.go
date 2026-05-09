package model

import (
	"time"

	"gorm.io/gorm"
)

type PropertyImage struct {
	ID         uint           `gorm:"primaryKey;autoIncrement"                json:"id"`
	PropertyID uint           `gorm:"not null;index"                          json:"property_id"`
	ImageURL   string         `gorm:"type:varchar(255);not null"               json:"image_url"`
	IsPrimary  bool           `gorm:"not null;default:false"                   json:"is_primary"`
	SortOrder  int            `gorm:"not null;default:0"                       json:"sort_order"`
	CreatedAt  time.Time      `gorm:"autoCreateTime"                           json:"created_at"`
	DeletedAt  gorm.DeletedAt `gorm:"index"                                    json:"deleted_at,omitempty"`

	// Relations
	Property Property `gorm:"foreignKey:PropertyID" json:"property,omitempty"`
}

func (PropertyImage) TableName() string {
	return "property_images"
}
