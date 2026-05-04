package repository

import (
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
	"gorm.io/gorm"
)

// Interface

type PropertyFacilityRepository interface {
	Create(pf *model.PropertyFacility) error
	FindByID(id uint) (*model.PropertyFacility, error)
	FindByPropertyIDAndFacilityTypeID(propertyID uint, facilityTypeID uint) (*model.PropertyFacility, error)
	FindAll() ([]model.PropertyFacility, error)
	Update(pf *model.PropertyFacility) error
	Delete(id uint) error
}

// Helper

func (r *propertyFacilityRepository) baseQuery() *gorm.DB {
	return r.db.
		Joins("FacilityType").
		Joins("Property")
}

// Implement

type propertyFacilityRepository struct {
	db *gorm.DB
}

func NewPropertyFacilityRepository(db *gorm.DB) PropertyFacilityRepository {
	return &propertyFacilityRepository{db: db}
}

// Method

func (r *propertyFacilityRepository) Create(pf *model.PropertyFacility) error {
	return r.db.Create(pf).Error
}

func (r *propertyFacilityRepository) FindByID(id uint) (*model.PropertyFacility, error) {
	var pf model.PropertyFacility
	err := r.baseQuery().
		First(&pf, id).Error
	if err != nil {
		logger.Log.Info("ID not found")
		return nil, err
	}

	return &pf, err
}

func (r *propertyFacilityRepository) FindByPropertyID(id uint) ([]model.PropertyFacility, error) {
	var pfs []model.PropertyFacility
	err := r.baseQuery().
		Where("property_id = ?", id).
		Find(&pfs).Error
	if err != nil {
		logger.Log.Info("Property ID not found")
		return nil, err
	}

	return pfs, err
}

func (r *propertyFacilityRepository) FindByPropertyIDAndFacilityTypeID(propertyID uint, facilityTypeID uint) (*model.PropertyFacility, error) {
	var pf model.PropertyFacility
	err := r.db.
		Where("property_id = ? AND facility_type_id = ?", propertyID, facilityTypeID).
		First(&pf).Error
	if err != nil {
		logger.Log.Info("ID AND FacilityType not found")
		return nil, err
	}

	return &pf, err
}

func (r *propertyFacilityRepository) FindAll() ([]model.PropertyFacility, error) {
	var pfs []model.PropertyFacility
	err := r.baseQuery().
		Find(&pfs).Error
	return pfs, err
}

func (r *propertyFacilityRepository) Update(pf *model.PropertyFacility) error {
	return r.db.Save(pf).Error
}

func (r *propertyFacilityRepository) Delete(id uint) error {
	return r.db.Delete(&model.PropertyFacility{}, id).Error
}
