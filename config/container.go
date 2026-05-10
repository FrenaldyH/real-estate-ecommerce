package config

import "os"

func InitDB() {
	connectDB()
	if os.Getenv("APP_ENV") == "development" {
		dropDB()
	}
	migrateDB()
}
