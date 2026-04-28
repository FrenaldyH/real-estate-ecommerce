package model

import (
	"time"

	"gorm.io/gorm"
)

type Agency struct {
	ID          uint           `gorm:"primaryKey;autoIncrement"                        json:"id"`
	AgencyName  string         `gorm:"type:varchar(100);not null;uniqueIndex"           json:"agency_name"`
	Address     string         `gorm:"type:varchar(255);not null"                       json:"address"`
	PhoneNumber string         `gorm:"type:varchar(20);not null"                        json:"phone_number"`
	Email       string         `gorm:"type:varchar(255);not null;uniqueIndex"           json:"email"`
	NIB         string         `gorm:"type:varchar(255);not null;uniqueIndex"           json:"nib"`
	CreatedAt   time.Time      `gorm:"autoCreateTime"                                   json:"created_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index"                                            json:"deleted_at,omitempty"`

	// Relations
	Agents []Agent `gorm:"foreignKey:AgencyID" json:"agents,omitempty"`
}

func (Agency) TableName() string {
	return "agencies"
}
