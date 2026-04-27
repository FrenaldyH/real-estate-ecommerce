package model

type FacilityType struct {
	ID   uint   `gorm:"primaryKey"`
	Name string `gorm:"not null;uniqueIndex"`
}
