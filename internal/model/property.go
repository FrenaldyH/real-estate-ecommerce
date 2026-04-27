package model

import "time"

type Property struct {
	ID          uint       `gorm:"primaryKey"`
	TypeID      uint       `gorm:"not null"`
	AgentID     uint       `gorm:"not null"`
	NOPPBB      string     `gorm:"column:NOP_PBB;not null;uniqueIndex"`
	Title       string     `gorm:"not null"`
	Description string     `gorm:"not null"`
	Price       float64    `gorm:"type:decimal(17,2);not null"`
	Address     string     `gorm:"not null"`
	City        string     `gorm:"not null"`
	Province    string     `gorm:"not null"`
	Status      string     `gorm:"default:'available'"`
	CreatedAt   time.Time  `gorm:"autoCreateTime"`
	DeletedAt   *time.Time `gorm:"index"`

	// Relasi
	Type       PropertyType       `gorm:"foreignKey:TypeID"`
	Agent      Agent              `gorm:"foreignKey:AgentID"`
	Facilities []PropertyFacility `gorm:"foreignKey:PropertyID"`
	Images     []PropertyImage    `gorm:"foreignKey:PropertyID"`
}
