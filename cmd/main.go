package main

import (
	"fmt"
	"log"
	"os"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/config"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/routes"
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

	r := routes.SetupRouter(config.DB)
	server, port := "localhost", ":8080"

	logger.Log.Info(fmt.Sprintf("Starting server on %s%s", server, port))
	if err := r.Run(server + port); err != nil {
		logger.Log.Error("Failed to start server: ", err)
		log.Fatalf("Server error: %v", err)
	}
}
