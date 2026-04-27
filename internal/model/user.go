package model

import "time"

type User struct {
	ID          uint       `gorm:"primaryKey"`
	Username    string     `gorm:"not null;uniqueIndex"`
	FullName    string     `gorm:"not null"`
	Email       string     `gorm:"not null;uniqueIndex"`
	PhoneNumber string     `gorm:"not null"`
	Password    string     `gorm:"not null"`
	CreatedAt   time.Time  `gorm:"autoCreateTime"`
	DeletedAt   *time.Time `gorm:"index"`
}
