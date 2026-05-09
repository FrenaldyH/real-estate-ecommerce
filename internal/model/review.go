package model

import (
	"time"

	"gorm.io/gorm"
)

type Review struct {
	ID         uint           `gorm:"primaryKey;autoIncrement"    json:"id"`
	UserID     uint           `gorm:"not null;index"              json:"user_id"`
	PropertyID uint           `gorm:"not null;index"              json:"property_id"`
	Rating     int8           `gorm:"type:smallint;not null"      json:"rating"`
	Comment    *string        `gorm:"type:text;default:null"      json:"comment,omitempty"`
	CreatedAt  time.Time      `gorm:"autoCreateTime"              json:"created_at"`
	DeletedAt  gorm.DeletedAt `gorm:"index"                       json:"deleted_at,omitempty"`

	// Relations
	User     User     `gorm:"foreignKey:UserID"     json:"user,omitempty"`
	Property Property `gorm:"foreignKey:PropertyID" json:"property,omitempty"`
}

func (Review) TableName() string {
	return "reviews"
}
