package config

import (
	"fmt"
	"os"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func getDsn() (string, error) {
	requiredEnv := []string{"DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME", "DB_PORT", "DB_SSLMODE", "DB_TIMEZONE"}

	for _, env := range requiredEnv {
		if os.Getenv(env) == "" {
			logger.Log.Warn(fmt.Sprintf("Env var %s is not set", env))
		}
	}
	logger.Log.Debug("All env var is available")

	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=%s",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_SSLMODE"),
		os.Getenv("DB_TIMEZONE"),
	)

	return dsn, nil
}

func ConnectDB() {
	dsn, err := getDsn()
	if err != nil {
		logger.Log.Error("Database Error: %v", err)
	}

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		logger.Log.Error("Failed to connect to database: %v", err)
	} else {
		logger.Log.Info(fmt.Sprintf("Database successfully connected at %s:%s", os.Getenv("DB_HOST"), os.Getenv("DB_PORT")))
	}
}

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

func InitDB() {
	ConnectDB()
	MigrateDB()
}
