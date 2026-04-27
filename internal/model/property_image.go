package model

import "time"

type PropertyImage struct {
	ID         uint      `gorm:"primaryKey"`
	PropertyID uint      `gorm:"not null"`
	ImageURL   string    `gorm:"not null"`
	IsPrimary  bool      `gorm:"default:false"`
	SortOrder  uint      `gorm:"default:0"`
	CreatedAt  time.Time `gorm:"autoCreateTime"`

	// Relasi
	Property Property `gorm:"foreignKey:PropertyID"`
}
