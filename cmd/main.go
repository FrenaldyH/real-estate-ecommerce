package main

import (
	"os"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/config"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
	"github.com/joho/godotenv"
)

func main() {
	logger.Init()
	logger.Log.Info("Starting application...")

	if err := godotenv.Load(); err != nil {
		logger.Log.Warn("No .env file found")
	} else {
		logger.Log.Debug("Environment variables loaded")
	}

	config.InitDB()
	logger.Log.Info("Database Initialized")

	if os.Getenv("APP_ENV") == "development" {
		config.RunSeeder(config.DB)
		logger.Log.Info("Seeder completed")
	}
}
