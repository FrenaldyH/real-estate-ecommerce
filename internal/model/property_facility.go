package model

type PropertyFacility struct {
	ID             uint `gorm:"primaryKey"`
	PropertyID     uint `gorm:"not null"`
	FacilityTypeID uint `gorm:"not null"`

	// Relasi
	Property     Property     `gorm:"foreignKey:PropertyID"`
	FacilityType FacilityType `gorm:"foreignKey:FacilityTypeID"`
}

// Composite unique index
func (PropertyFacility) TableName() string { return "property_facilities" }
