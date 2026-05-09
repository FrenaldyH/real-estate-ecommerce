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

type WishlistService interface {
	GetUserWishlists(username string) ([]dto.WishlistResponse, error)
	CreateUserWishlist(username string, req dto.CreateWishlistRequest) (*dto.WishlistResponse, error)
	DeleteUserWishlist(wishlistID uint, username string) error
}

// Implement

type wishlistService struct {
	wishlistRepo repository.WishlistRepository
	userRepo     repository.UserRepository
}

func NewWishlistService(
	wishlistRepo repository.WishlistRepository,
	userRepo repository.UserRepository,
) WishlistService {
	return &wishlistService{
		wishlistRepo: wishlistRepo,
		userRepo:     userRepo,
	}
}

// Method

func (s *wishlistService) GetUserWishlists(username string) ([]dto.WishlistResponse, error) {
	user, err := s.userRepo.FindByUsername(username)
	if err != nil {
		logger.Log.Info("user not found")
		return nil, errors.New("user not found")
	}

	wishlists, err := s.wishlistRepo.FindByUserID(user.ID)
	if err != nil {
		return nil, err
	}

	var responses []dto.WishlistResponse
	for _, w := range wishlists {
		responses = append(responses, toWishlistResponse(w))
	}

	if responses == nil {
		responses = []dto.WishlistResponse{}
	}

	return responses, nil
}

func (s *wishlistService) CreateUserWishlist(username string, req dto.CreateWishlistRequest) (*dto.WishlistResponse, error) {
	user, err := s.userRepo.FindByUsername(username)
	if err != nil {
		logger.Log.Info("user not found")
		return nil, errors.New("user not found")
	}

	// Cek apakah sudah ada (termasuk soft-deleted)
	existing, err := s.wishlistRepo.FindByUserIDAndPropertyID(user.ID, req.PropertyID)

	if err == nil && existing != nil {
		// Masih aktif → tolak duplikat
		if !existing.DeletedAt.Valid {
			logger.Log.Info("property already in wishlist")
			return nil, errors.New("property already in wishlist")
		}

		// Pernah dihapus (soft-delete) → restore
		if restoreErr := s.wishlistRepo.Update(existing.ID, map[string]any{
			"deleted_at": nil,
		}); restoreErr != nil {
			return nil, restoreErr
		}

		restored, err := s.wishlistRepo.FindByID(existing.ID)
		if err != nil {
			return nil, err
		}
		resp := toWishlistResponse(*restored)
		return &resp, nil
	}

	// Belum pernah ada → buat baru
	if !errors.Is(err, gorm.ErrRecordNotFound) && err != nil {
		return nil, err
	}

	newWishlist := &model.Wishlist{
		UserID:     user.ID,
		PropertyID: req.PropertyID,
	}

	if err := s.wishlistRepo.Create(newWishlist); err != nil {
		return nil, err
	}

	created, err := s.wishlistRepo.FindByID(newWishlist.ID)
	if err != nil {
		return nil, err
	}

	resp := toWishlistResponse(*created)
	return &resp, nil
}

func (s *wishlistService) DeleteUserWishlist(wishlistID uint, username string) error {
	user, err := s.userRepo.FindByUsername(username)
	if err != nil {
		logger.Log.Info("user not found")
		return errors.New("user not found")
	}

	wishlist, err := s.wishlistRepo.FindByID(wishlistID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return errors.New("wishlist not found")
		}
		return err
	}

	if wishlist.UserID != user.ID {
		return errors.New("forbidden: wishlist does not belong to you")
	}

	return s.wishlistRepo.Delete(wishlistID)
}

func toWishlistResponse(w model.Wishlist) dto.WishlistResponse {
	return dto.WishlistResponse{
		ID:       w.ID,
		Property: *mapToDetailResponse(w.Property),
		User:     *userModelToUserResponse(&w.User),
	}
}
