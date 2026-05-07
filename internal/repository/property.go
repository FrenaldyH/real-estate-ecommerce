package repository

import (
	"errors"
	"fmt"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
	"gorm.io/gorm"
)

// Interface

type PropertyRepository interface {
	Create(p *model.Property) error
	FindByID(id uint) (*model.Property, error)
	FindAll() ([]model.Property, error)
	FindByCity(city string) ([]model.Property, error)
	FindByProvince(province string) ([]model.Property, error)
	FindByStatus(status model.PropertyStatus) ([]model.Property, error)
	FindByPropertyTypeName(name string) ([]model.Property, error)
	FindByPriceRange(min, max float64) ([]model.Property, error)
	FindByListingType(listingType model.ListingType) ([]model.Property, error)
	Update(id uint, data map[string]any) error
	Delete(id uint) error
}

// Implement

type propertyRepository struct {
	db *gorm.DB
}

func NewPropertyRepository(db *gorm.DB) PropertyRepository {
	return &propertyRepository{db: db}
}

// Helper

func (r *propertyRepository) baseQuery() *gorm.DB {
	return r.db.
		Joins("PropertyType").             // one-to-one → Joins
		Joins("Agent").                    // one-to-one → Joins
		Preload("Images").                 // one-to-many → Preload
		Preload("Facilities.FacilityType") // one-to-many → Preload
}

// Method

func (r *propertyRepository) Create(p *model.Property) error {
	return r.db.Create(p).Error
}

func (r *propertyRepository) FindByID(id uint) (*model.Property, error) {
	var p model.Property
	err := r.baseQuery().
		First(&p, id).Error
	if err != nil {
		logger.Log.Info("ID not found")
		return nil, err
	}

	return &p, err
}

func (r *propertyRepository) FindAll() ([]model.Property, error) {
	var ps []model.Property
	err := r.baseQuery().
		Find(&ps).Error
	return ps, err
}

func (r *propertyRepository) FindByCity(city string) ([]model.Property, error) {
	var ps []model.Property
	err := r.baseQuery().
		Where("properties.city = ?", city).
		Find(&ps).Error

	return ps, err
}

func (r *propertyRepository) FindByProvince(province string) ([]model.Property, error) {
	var ps []model.Property
	err := r.baseQuery().
		Where("properties.province = ?", province).
		Find(&ps).Error

	return ps, err
}

func (r *propertyRepository) FindByImbPbb(ImbPbb string) (*model.Property, error) {
	var p model.Property
	err := r.baseQuery().
		Where("imb_pbb = ?", ImbPbb).
		Find(&p).Error
	if err != nil {
		logger.Log.Info("Property Not Found")
		return nil, errors.New("Property Not Found")
	}

	return &p, nil
}

func (r *propertyRepository) FindByStatus(status model.PropertyStatus) ([]model.Property, error) {
	var ps []model.Property
	err := r.baseQuery().
		Where("properties.status = ?", status).
		Find(&ps).Error

	return ps, err
}

func (r *propertyRepository) FindByPropertyTypeName(name string) ([]model.Property, error) {
	var ps []model.Property
	err := r.baseQuery().
		Where("\"PropertyType\".name = ?", name).
		Find(&ps).Error

	if len(ps) == 0 {
		logger.Log.Info(fmt.Sprintf("No property with type %s found", name))
		return nil, errors.New(fmt.Sprintf("No property with listing-type %s found", name))
	}

	return ps, err
}

func (r *propertyRepository) FindByPriceRange(min float64, max float64) ([]model.Property, error) {
	var ps []model.Property
	err := r.baseQuery().
		Where("properties.price BETWEEN ? AND ?", min, max).
		Find(&ps).Error

	return ps, err
}

func (r *propertyRepository) FindByListingType(listingType model.ListingType) ([]model.Property, error) {
	var ps []model.Property
	err := r.baseQuery().
		Where("properties.listing_type = ?", listingType).
		Find(&ps).Error

	if len(ps) == 0 {
		logger.Log.Info(fmt.Sprintf("No property with listing-type %s found", string(listingType)))
		return nil, errors.New(fmt.Sprintf("No property with listing-type %s found", string(listingType)))
	}
	return ps, err
}

func (r *propertyRepository) Update(id uint, data map[string]any) error {
	return r.db.Model(&model.Property{}).
		Where("id = ?", id).
		Updates(data).Error
}

func (r *propertyRepository) Delete(id uint) error {
	return r.db.Delete(&model.Property{}, id).Error
}
