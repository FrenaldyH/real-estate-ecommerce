package di

import (
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/repository"
	"gorm.io/gorm"
)

// [NOTES] Nnanti diganti handler
type Container struct {
	UserRepo     repository.UserRepository
	AgentRepo    repository.AgentRepository
	PropertyRepo repository.PropertyRepository
	ReviewRepo   repository.ReviewRepository
	WishlistRepo repository.WishlistRepository
}

func NewContainer(db *gorm.DB) *Container {
	return &Container{
		UserRepo:     repository.NewUserRepository(db),
		AgentRepo:    repository.NewAgentRepository(db),
		PropertyRepo: repository.NewPropertyRepository(db),
		ReviewRepo:   repository.NewReviewRepository(db),
		WishlistRepo: repository.NewWishlistRepository(db),
	}
}
