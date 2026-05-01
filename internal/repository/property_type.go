package repository

import (
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"gorm.io/gorm"
)

// Interface

type PropertyTypeRepository interface {
	Create(pt *model.PropertyType) error
	FindByID(id uint) (*model.PropertyType, error)
	FindByName(name string) (*model.PropertyType, error)
	FindAll() ([]model.PropertyType, error)
	Update(pt *model.PropertyType) error
	Delete(id uint) error
}

// Implement

type propertyTypeRepository struct {
	db *gorm.DB
}

func NewPropertyTypeRepository(db *gorm.DB) PropertyTypeRepository {
	return &propertyTypeRepository{db: db}
}

// Method

func (r *propertyTypeRepository) Create(pt *model.PropertyType) error {
	return r.db.Create(pt).Error
}

func (r *propertyTypeRepository) FindByID(id uint) (*model.PropertyType, error) {
	var pt model.PropertyType
	err := r.db.First(&pt, id).Error
	return &pt, err
}

func (r *propertyTypeRepository) FindByName(name string) (*model.PropertyType, error) {
	var pt model.PropertyType
	err := r.db.
		Where("name = ?", name).
		First(&pt).Error
	return &pt, err
}

func (r *propertyTypeRepository) FindAll() ([]model.PropertyType, error) {
	var pts []model.PropertyType
	err := r.db.Find(&pts).Error
	return pts, err
}

func (r *propertyTypeRepository) Update(pt *model.PropertyType) error {
	return r.db.Save(pt).Error
}

func (r *propertyTypeRepository) Delete(id uint) error {
	return r.db.Delete(&model.PropertyType{}, id).Error
}
