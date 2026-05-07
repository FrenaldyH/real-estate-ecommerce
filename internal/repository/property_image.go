package repository

import (
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
	"gorm.io/gorm"
)

// Interface

type PropertyImageRepository interface {
	Create(pi *model.PropertyImage) error
	FindByID(id uint) (*model.PropertyImage, error)
	FindByPropertyID(propertyID uint) ([]model.PropertyImage, error)
	FindByPropertyIDAndPropertyImageID(propertyID uint, propertyImageID uint) (*model.PropertyImage, error)
	FindAll() ([]model.PropertyImage, error)
	Update(id uint, data map[string]any) error
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
	if err != nil {
		logger.Log.Info("ID not found")
		return nil, err
	}

	return &pi, err
}

func (r *propertyImageRepository) FindByPropertyID(propertyID uint) ([]model.PropertyImage, error) {
	var pis []model.PropertyImage
	err := r.db.
		Where("property_id = ?", propertyID).
		Find(&pis).Error
	if err != nil {
		logger.Log.Info("Property ID not found")
		return nil, err
	}

	return pis, err
}

func (r *propertyImageRepository) FindByPropertyIDAndPropertyImageID(propertyImageID uint, propertyID uint) (*model.PropertyImage, error) {
	var pi model.PropertyImage
	err := r.db.
		Where("id = ? AND property_id = ?", propertyImageID, propertyID).
		First(&pi).Error
	if err != nil {
		logger.Log.Info("Property ID AND PropertyImage not found")
		return nil, err
	}

	return &pi, err
}

func (r *propertyImageRepository) FindAll() ([]model.PropertyImage, error) {
	var pis []model.PropertyImage
	err := r.baseQuery().
		Find(&pis).Error
	return pis, err
}

func (r *propertyImageRepository) Update(id uint, data map[string]any) error {
	return r.db.Model(&model.PropertyImage{}).
		Where("id = ?", id).
		Updates(data).Error
}

func (r *propertyImageRepository) Delete(id uint) error {
	return r.db.Delete(&model.PropertyImage{}, id).Error
}
