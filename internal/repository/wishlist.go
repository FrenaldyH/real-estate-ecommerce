package repository

import (
	"fmt"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
	"gorm.io/gorm"
)

// Interface

type WishlistRepository interface {
	Create(w *model.Wishlist) error
	FindByID(id uint) (*model.Wishlist, error)
	FindByUserID(userID uint) ([]model.Wishlist, error)
	FindByUserIDAndPropertyID(userID, propertyID uint) (*model.Wishlist, error)
	Delete(id uint) error
}

// Implement

type wishlistRepository struct {
	db *gorm.DB
}

func NewWishlistRepository(db *gorm.DB) WishlistRepository {
	return &wishlistRepository{db: db}
}

// Helper

func (r *wishlistRepository) baseQuery() *gorm.DB {
	return r.db.
		Joins("Property").             // one-to-one → Joins
		Joins("Property.PropertyType") // nested one-to-one → Joins
}

// Method

func (r *wishlistRepository) Create(w *model.Wishlist) error {
	return r.db.Create(w).Error
}

func (r *wishlistRepository) FindByID(id uint) (*model.Wishlist, error) {
	var w model.Wishlist
	err := r.baseQuery().
		First(&w, id).Error
	if err != nil {
		logger.Log.Info("ID not found")
		return nil, err
	}

	return &w, err
}

func (r *wishlistRepository) FindByUserID(userID uint) ([]model.Wishlist, error) {
	var ws []model.Wishlist
	err := r.baseQuery().
		Where("wishlists.user_id = ?", userID).
		Find(&ws).Error
	if err != nil {
		logger.Log.Info("User ID not found")
		return nil, err
	}

	return ws, err
}

func (r *wishlistRepository) FindByUserIDAndPropertyID(userID, propertyID uint) (*model.Wishlist, error) {
	var w model.Wishlist
	err := r.db.Unscoped(). // include soft deleted
				Where("user_id = ? AND property_id = ?", userID, propertyID).
				First(&w).Error
	if err != nil {
		logger.Log.Info(fmt.Sprintf("User ID %d AND Property ID %d not found", userID, propertyID))
		return nil, err
	}

	return &w, err
}

func (r *wishlistRepository) Delete(id uint) error {
	return r.db.Delete(&model.Wishlist{}, id).Error
}
