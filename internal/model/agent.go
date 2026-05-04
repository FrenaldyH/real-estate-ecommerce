package model

import (
	"time"

	"gorm.io/gorm"
)

type Agent struct {
	ID                  uint           `gorm:"primaryKey;autoIncrement"                            json:"id"`
	UserID              uint           `gorm:"not null;uniqueIndex"                                json:"user_id"`
	BioDescription      *string        `gorm:"type:text;default:null"                              json:"bio_description,omitempty"`
	AgencyID            *uint          `gorm:"default:null"                                        json:"agency_id,omitempty"`
	SIUP4               *string        `gorm:"type:varchar(50);default:null;uniqueIndex" json:"siup4,omitempty"`
	TotalPropertiesSold int            `gorm:"not null;default:0"                                  json:"total_properties_sold"`
	CreatedAt           time.Time      `gorm:"autoCreateTime"                                      json:"created_at"`
	DeletedAt           gorm.DeletedAt `gorm:"index"                                               json:"deleted_at,omitempty"`

	// Relations
	User       User       `gorm:"foreignKey:UserID"   json:"user,omitempty"`
	Agency     *Agency    `gorm:"foreignKey:AgencyID" json:"agency,omitempty"`
	Properties []Property `gorm:"foreignKey:AgentID"  json:"properties,omitempty"`
}

func (Agent) TableName() string {
	return "agents"
}
