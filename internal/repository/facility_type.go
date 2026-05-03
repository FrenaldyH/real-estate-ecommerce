package repository

import (
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
	"gorm.io/gorm"
)

// Interface

type FacilityTypeRepository interface {
	Create(ft *model.FacilityType) error
	FindByName(name string) (*model.FacilityType, error)
	FindByID(id uint) (*model.FacilityType, error)
	FindAll() ([]model.FacilityType, error)
	Update(ft *model.FacilityType) error
	Delete(id uint) error
}

// Implement

type facilityTypeRepository struct {
	db *gorm.DB
}

func NewFacilityTypeRepository(db *gorm.DB) FacilityTypeRepository {
	return &facilityTypeRepository{db: db}
}

// Method

func (r *facilityTypeRepository) Create(ft *model.FacilityType) error {
	return r.db.Create(ft).Error
}

func (r *facilityTypeRepository) FindByName(name string) (*model.FacilityType, error) {
	var ft model.FacilityType
	err := r.db.Where("name = ?", name).First(&ft).Error
	if err != nil {
		logger.Log.Info("Name not found")
		return nil, err
	}

	return &ft, err
}

func (r *facilityTypeRepository) FindByID(id uint) (*model.FacilityType, error) {
	var ft model.FacilityType
	err := r.db.First(&ft, id).Error
	if err != nil {
		logger.Log.Info("ID not found")
		return nil, err
	}

	return &ft, err
}

func (r *facilityTypeRepository) FindAll() ([]model.FacilityType, error) {
	var fts []model.FacilityType
	err := r.db.Find(&fts).Error
	return fts, err
}

func (r *facilityTypeRepository) Update(ft *model.FacilityType) error {
	return r.db.Save(ft).Error
}

func (r *facilityTypeRepository) Delete(id uint) error {
	return r.db.Delete(&model.User{}, id).Error
}
