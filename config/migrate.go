package config

import (
	"fmt"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
)

func MigrateDB() {
	err := DB.AutoMigrate(
		&model.Agency{},
		&model.User{},
		&model.Agent{},
		&model.PropertyType{},
		&model.Property{},
		&model.FacilityType{},
		&model.PropertyFacility{},
		&model.PropertyImage{},
		&model.Wishlist{},
		&model.Review{},
	)

	if err != nil {
		logger.Log.Error(fmt.Sprintf("Failed to auto-migrate database model: %v", err))
	} else {
		logger.Log.Info("Database models auto-migrated successfully")
	}
}

func DropDB() {
	err := DB.Migrator().DropTable(
		&model.Agency{},
		&model.User{},
		&model.Agent{},
		&model.PropertyType{},
		&model.Property{},
		&model.FacilityType{},
		&model.PropertyFacility{},
		&model.PropertyImage{},
		&model.Wishlist{},
		&model.Review{},
	)

	if err != nil {
		logger.Log.Warn(fmt.Sprintf("Failed to drop tables: %v", err))
	} else {
		logger.Log.Info("Successfully dropped all test tables")
	}
}
