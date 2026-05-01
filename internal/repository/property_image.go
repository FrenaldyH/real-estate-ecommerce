package repository

import (
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"gorm.io/gorm"
)

// Interface

type PropertyImageRepository interface {
	Create(pi *model.PropertyImage) error
	FindByID(id uint) (*model.PropertyImage, error)
	FindByPropertyId(propertyID uint) (*model.PropertyImage, error)
	FindByPropertyIDAndPropertyImageID(propertyID uint, propertyImageID uint) (*model.PropertyImage, error)
	Update(pi *model.PropertyImage) error
	Delete(id uint) error
}

// Implement

type propertyImageRepository struct {
	db *gorm.DB
}

// Method

func (r *propertyImageRepository) Create(pi *model.PropertyImage) error {
	return r.db.Create(pi).Error
}

func (r *propertyImageRepository) FindByID(id uint) (*model.PropertyImage, error) {
	var pi model.PropertyImage
	err := r.db.Where("id = ?", id).First(&pi).Error
	return &pi, err
}

func (r *propertyImageRepository) FindByPropertyId(propertyID uint) (*model.PropertyImage, error) {
	var pi model.PropertyImage
	err := r.db.Where("property_id = ?", propertyID).First(&pi).Error
	return &pi, err
}

func (r *propertyImageRepository) FindByPropertyIDAndPropertyImageID(propertyID uint, propertyImageID uint) (*model.PropertyImage, error) {
	var pi model.PropertyImage
	err := r.db.
		Where("id = ? AND property_id = ?", propertyID, propertyImageID).
		First(&pi).Error
	return &pi, err
}

func (r *propertyImageRepository) Update(pi *model.PropertyImage) error {
	return r.db.Save(pi).Error
}

func (r *propertyImageRepository) Delete(id uint) error {
	return r.db.Delete(&model.PropertyImage{}, id).Error
}
