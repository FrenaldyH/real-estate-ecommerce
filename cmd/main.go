package main

import (
	"github.com/FrenaldyH/real-estate-ecommerce/backend/config"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
	"github.com/joho/godotenv"
)

func main() {
	logger.Init()
	logger.Log.Info("Starting application...")

	if err := godotenv.Load(); err != nil {
		logger.Log.Warn("No .env file found")
	}
	logger.Log.Info("Environment variables loaded")

	config.InitDB()
	logger.Log.Debug("Database Initialized")

}
