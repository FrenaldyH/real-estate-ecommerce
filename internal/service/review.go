package service

import (
	"errors"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/dto"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/repository"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
	"gorm.io/gorm"
)

// Interface

type ReviewService interface {
	GetReviewsByProperty(propertyID uint) ([]dto.ReviewResponse, error)
	CreateReview(username string, propertyID uint, req dto.CreateReviewRequest) (*dto.ReviewResponse, error)
	UpdateReview(username string, propertyID uint, req dto.CreateReviewRequest) (*dto.ReviewResponse, error)
	DeleteReview(username string, propertyID uint) error
}

// Implement

type reviewService struct {
	reviewRepo repository.ReviewRepository
	userRepo   repository.UserRepository
}

func NewReviewService(
	reviewRepo repository.ReviewRepository,
	userRepo repository.UserRepository,
) ReviewService {
	return &reviewService{
		reviewRepo: reviewRepo,
		userRepo:   userRepo,
	}
}

// Helper

func toReviewResponse(r model.Review) dto.ReviewResponse {
	return dto.ReviewResponse{
		ID:         r.ID,
		UserID:     r.UserID,
		PropertyID: r.PropertyID,
		Rating:     r.Rating,
		Comment:    r.Comment,
		CreatedAt:  r.CreatedAt,
		User:       *userModelToUserResponse(&r.User), // reuse dari user.go
	}
}

// Method

func (s *reviewService) GetReviewsByProperty(propertyID uint) ([]dto.ReviewResponse, error) {
	reviews, err := s.reviewRepo.FindByPropertyID(propertyID)
	if err != nil {
		return nil, err
	}

	var responses []dto.ReviewResponse
	for _, r := range reviews {
		responses = append(responses, toReviewResponse(r))
	}

	if responses == nil {
		responses = []dto.ReviewResponse{}
	}

	return responses, nil
}

func (s *reviewService) CreateReview(username string, propertyID uint, req dto.CreateReviewRequest) (*dto.ReviewResponse, error) {
	user, err := s.userRepo.FindByUsername(username)
	if err != nil {
		logger.Log.Info("user not found: " + username)
		return nil, errors.New("user not found")
	}

	// [PENCEGAHAN SPAMMING]
	existing, err := s.reviewRepo.FindByUserIDAndPropertyID(user.ID, propertyID)
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}
	if existing != nil {
		return nil, errors.New("you have already reviewed this property")
	}

	review := &model.Review{
		UserID:     user.ID,
		PropertyID: propertyID,
		Rating:     req.Rating,
		Comment:    req.Comment,
	}

	if err := s.reviewRepo.Create(review); err != nil {
		logger.Log.Error("failed to create review")
		return nil, errors.New("failed to create review")
	}

	created, err := s.reviewRepo.FindByID(review.ID)
	if err != nil {
		return nil, err
	}

	resp := toReviewResponse(*created)
	return &resp, nil
}

func (s *reviewService) UpdateReview(username string, propertyID uint, req dto.CreateReviewRequest) (*dto.ReviewResponse, error) {
	user, err := s.userRepo.FindByUsername(username)
	if err != nil {
		logger.Log.Info("user not found: " + username)
		return nil, errors.New("user not found")
	}

	review, err := s.reviewRepo.FindByUserIDAndPropertyID(user.ID, propertyID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("review not found")
		}
		return nil, err
	}

	data := map[string]any{
		"rating":  req.Rating,
		"comment": req.Comment,
	}

	if err := s.reviewRepo.Update(review.ID, data); err != nil {
		logger.Log.Error("failed to update review")
		return nil, errors.New("failed to update review")
	}

	updated, err := s.reviewRepo.FindByID(review.ID)
	if err != nil {
		return nil, err
	}

	resp := toReviewResponse(*updated)
	return &resp, nil
}

func (s *reviewService) DeleteReview(username string, propertyID uint) error {
	user, err := s.userRepo.FindByUsername(username)
	if err != nil {
		logger.Log.Info("user not found: " + username)
		return errors.New("user not found")
	}

	review, err := s.reviewRepo.FindByUserIDAndPropertyID(user.ID, propertyID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return errors.New("review not found")
		}
		return err
	}

	return s.reviewRepo.Delete(review.ID)
}
