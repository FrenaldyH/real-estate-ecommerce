package config

import (
	"fmt"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
)

func migrateDB() {
	// Enable pgvector extension; required before creating knowledge_chunks table
	if err := DB.Exec("CREATE EXTENSION IF NOT EXISTS vector").Error; err != nil {
		logger.Log.Error("Failed to create vector extension — install pgvector first: sudo apt-get install postgresql-16-pgvector", "error", err.Error())
	}

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
		&model.KnowledgeChunk{},
	)

	if err != nil {
		logger.Log.Error("Failed to auto-migrate database models", "error", err.Error())
	} else {
		logger.Log.Info("Database models auto-migrated successfully")
	}
}

func dropDB() {
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
