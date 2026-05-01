package repository

import (
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"gorm.io/gorm"
)

// Interface

type PropertyImageRepository interface {
	Create(pi *model.PropertyImage) error
	FindByID(id uint) (*model.PropertyImage, error)
	FindByPropertyId(propertyID uint) ([]model.PropertyImage, error)
	FindByPropertyIDAndPropertyImageID(propertyID uint, propertyImageID uint) (*model.PropertyImage, error)
	FindAll() ([]model.PropertyImage, error)
	Update(pi *model.PropertyImage) error
	Delete(id uint) error
}

// Implement

type propertyImageRepository struct {
	db *gorm.DB
}

func NewPropertyImageRepository(db *gorm.DB) PropertyImageRepository {
	return &propertyImageRepository{db: db}
}

// Helper

func (r *propertyImageRepository) baseQuery() *gorm.DB {
	return r.db.Joins("Property")
}

// Method

func (r *propertyImageRepository) Create(pi *model.PropertyImage) error {
	return r.db.Create(pi).Error
}

func (r *propertyImageRepository) FindByID(id uint) (*model.PropertyImage, error) {
	var pi model.PropertyImage
	err := r.baseQuery().
		First(&pi, id).Error
	return &pi, err
}

func (r *propertyImageRepository) FindByPropertyId(propertyID uint) ([]model.PropertyImage, error) {
	var pis []model.PropertyImage
	err := r.db.
		Where("property_id = ?", propertyID).
		Find(&pis).Error
	return pis, err
}

func (r *propertyImageRepository) FindByPropertyIDAndPropertyImageID(propertyID uint, propertyImageID uint) (*model.PropertyImage, error) {
	var pi model.PropertyImage
	err := r.db.
		Where("id = ? AND property_id = ?", propertyID, propertyImageID).
		First(&pi).Error
	return &pi, err
}

func (r *propertyImageRepository) FindAll() ([]model.PropertyImage, error) {
	var pis []model.PropertyImage
	err := r.baseQuery().
		Find(&pis).Error
	return pis, err
}

func (r *propertyImageRepository) Update(pi *model.PropertyImage) error {
	return r.db.Save(pi).Error
}

func (r *propertyImageRepository) Delete(id uint) error {
	return r.db.Delete(&model.PropertyImage{}, id).Error
}
