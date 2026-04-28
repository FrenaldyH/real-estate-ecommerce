package config

import (
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
)

func MigrateDB() {
	err := DB.AutoMigrate(
		&model.User{},
		&model.Agency{},
		&model.Agent{},
		&model.PropertyType{},
		&model.FacilityType{},
		&model.Property{},
		&model.PropertyFacility{},
		&model.PropertyImage{},
		&model.Wishlist{},
		&model.Review{},
	)

	if err != nil {
		logger.Log.Error("Failed to Migrate: %v", err)
	} else {
		logger.Log.Info("Database successfully migrated")
	}
}
