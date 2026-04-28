package model

import (
	"time"

	"gorm.io/gorm"
)

type UserRole string

const (
	RoleUser  UserRole = "user"
	RoleAgent UserRole = "agent"
	RoleAdmin UserRole = "admin"
)

type User struct {
	ID          uint           `gorm:"primaryKey;autoIncrement"                        json:"id"`
	NIK         string         `gorm:"type:char(16);not null;uniqueIndex"               json:"nik"`
	Username    string         `gorm:"type:varchar(50);not null;uniqueIndex"            json:"username"`
	FullName    string         `gorm:"type:varchar(100);not null"                       json:"full_name"`
	Email       string         `gorm:"type:varchar(255);not null;uniqueIndex"           json:"email"`
	PhoneNumber string         `gorm:"type:varchar(20);not null"                        json:"phone_number"`
	Password    string         `gorm:"type:varchar(255);not null"                       json:"-"`
	Role        UserRole       `gorm:"type:varchar(10);not null;default:'user'"         json:"role"`
	CreatedAt   time.Time      `gorm:"autoCreateTime"                                   json:"created_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index"                                            json:"deleted_at,omitempty"`

	// Relations
	Agent     *Agent     `gorm:"foreignKey:UserID"   json:"agent,omitempty"`
	Reviews   []Review   `gorm:"foreignKey:UserID"   json:"reviews,omitempty"`
	Wishlists []Wishlist `gorm:"foreignKey:UserID"   json:"wishlists,omitempty"`
}

func (User) TableName() string {
	return "users"
}

func (u *User) IsAgent() bool {
	return u.Role == RoleAgent
}

func (u *User) IsAdmin() bool {
	return u.Role == RoleAdmin
}
