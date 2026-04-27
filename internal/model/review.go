package model

import "time"

type Review struct {
	ID         uint `gorm:"primaryKey"`
	UserID     uint `gorm:"not null"`
	PropertyID uint `gorm:"not null"`
	Rating     int  `gorm:"not null"`
	Comment    string
	CreatedAt  time.Time `gorm:"autoCreateTime"`

	// Relasi
	User     User     `gorm:"foreignKey:UserID"`
	Property Property `gorm:"foreignKey:PropertyID"`
}
