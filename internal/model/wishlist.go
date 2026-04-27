package model

import "time"

type Wishlist struct {
	ID         uint       `gorm:"primaryKey"`
	UserID     uint       `gorm:"not null"`
	PropertyID uint       `gorm:"not null"`
	CreatedAt  time.Time  `gorm:"autoCreateTime"`
	DeletedAt  *time.Time `gorm:"index"`

	// Relasi
	User     User     `gorm:"foreignKey:UserID"`
	Property Property `gorm:"foreignKey:PropertyID"`
}
