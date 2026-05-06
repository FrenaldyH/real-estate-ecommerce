package repository

import (
	"fmt"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
	"gorm.io/gorm"
)

// Interface
type ReviewRepository interface {
	Create(r *model.Review) error
	FindByID(id uint) (*model.Review, error)
	FindByPropertyID(propertyID uint) ([]model.Review, error)
	FindByUserID(userID uint) ([]model.Review, error)
	FindByUserIDAndPropertyID(userID, propertyID uint) (*model.Review, error)
	Update(id uint, data map[string]any) error
	Delete(id uint) error
}

// Implement

type reviewRepository struct {
	db *gorm.DB
}

func NewReviewRepository(db *gorm.DB) ReviewRepository {
	return &reviewRepository{db: db}
}

// Helper

func (r *reviewRepository) baseQuery() *gorm.DB {
	return r.db.Joins("User") // one-to-one → Joins
}

// Method

func (r *reviewRepository) Create(review *model.Review) error {
	return r.db.Create(review).Error
}

func (r *reviewRepository) FindByID(id uint) (*model.Review, error) {
	var review model.Review
	err := r.baseQuery().
		First(&review, id).Error
	if err != nil {
		logger.Log.Info("ID not found")
		return nil, err
	}
	return &review, err
}

func (r *reviewRepository) FindByPropertyID(propertyID uint) ([]model.Review, error) {
	var reviews []model.Review
	err := r.baseQuery().
		Where("reviews.property_id = ?", propertyID).
		Find(&reviews).Error
	return reviews, err
}

func (r *reviewRepository) FindByUserID(userID uint) ([]model.Review, error) {
	var reviews []model.Review
	err := r.baseQuery().
		Where("reviews.user_id = ?", userID).
		Find(&reviews).Error
	return reviews, err
}

func (r *reviewRepository) FindByUserIDAndPropertyID(userID, propertyID uint) (*model.Review, error) {
	var review model.Review
	err := r.db.
		Where("user_id = ? AND property_id = ?", userID, propertyID).
		First(&review).Error
	if err != nil {
		logger.Log.Info(fmt.Sprintf("User with user ID %s AND property ID %s not found", userID, propertyID))
		return nil, err
	}

	return &review, err
}

func (r *reviewRepository) Update(id uint, data map[string]any) error {
	return r.db.Model(&model.User{}).
		Where("id = ?", id).
		Updates(data).Error
}

func (r *reviewRepository) Delete(id uint) error {
	return r.db.Delete(&model.Review{}, id).Error
}
