package repository

import (
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
	"gorm.io/gorm"
)

// Interface

type AgencyRepository interface {
	Create(agency *model.Agency) error
	FindByID(id uint) (*model.Agency, error)
	FindByNIB(nib string) (*model.Agency, error)
	FindByEmail(email string) (*model.Agency, error)
	FindAll() ([]model.Agency, error)
	Update(agency *model.Agency) error
	Delete(id uint) error
}

// Implement

type agencyRepository struct {
	db *gorm.DB
}

func NewAgencyRepository(db *gorm.DB) AgencyRepository {
	return &agencyRepository{db: db}
}

// Method

func (r *agencyRepository) Create(agency *model.Agency) error {
	return r.db.Create(agency).Error
}

func (r *agencyRepository) FindByID(id uint) (*model.Agency, error) {
	var agency model.Agency
	err := r.db.First(&agency, id).Error
	if err != nil {
		logger.Log.Info("ID not found")
		return nil, err
	}
	return &agency, err
}

func (r *agencyRepository) FindByNIB(nib string) (*model.Agency, error) {
	var agency model.Agency
	err := r.db.Where("nib = ?", nib).First(&agency).Error
	if err != nil {
		logger.Log.Info("NIB not found")
		return nil, err
	}
	return &agency, err
}

func (r *agencyRepository) FindByEmail(email string) (*model.Agency, error) {
	var agency model.Agency
	err := r.db.Where("email = ?", email).First(&agency).Error
	if err != nil {
		logger.Log.Info("Email not found")
		return nil, err
	}
	return &agency, err
}

func (r *agencyRepository) FindAll() ([]model.Agency, error) {
	var agencies []model.Agency
	err := r.db.Find(&agencies).Error
	return agencies, err
}

func (r *agencyRepository) Update(agency *model.Agency) error {
	return r.db.Save(agency).Error
}

func (r *agencyRepository) Delete(id uint) error {
	return r.db.Delete(&model.Agency{}, id).Error
}
