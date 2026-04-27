package model

import "time"

type Agent struct {
	ID             uint   `gorm:"primaryKey"`
	UserID         uint   `gorm:"not null;uniqueIndex"`
	AgencyID       *uint  `gorm:"Index"`
	BioDescription string `gorm:"not null"`
	IsVerified     bool   `gorm:"default:false"`

	CreatedAt time.Time  `gorm:"autoCreateTime"`
	DeletedAt *time.Time `gorm:"index"`

	User   User    `gorm:"foreignKey:UserID"`
	Agency *Agency `gorm:"foreignKey:AgencyID"` // pointer karena nullable
}
