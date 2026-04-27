package model

type PropertyType struct {
	ID   uint   `gorm:"primaryKey"`
	Name string `gorm:"not null;uniqueIndex"`
}
