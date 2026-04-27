package model

import "time"

type Agency struct {
	ID          uint   `gorm:"primaryKey"`
	AgencyName  string `gorm:"not null;uniqueIndex"`
	Address     string `gorm:"not null"`
	PhoneNumber string `gorm:"not null"`
	Email       string `gorm:"not null;uniqueIndex"`

	CreatedAt time.Time  `gorm:"autoCreateTime"`
	DeletedAt *time.Time `gorm:"index"`
}
