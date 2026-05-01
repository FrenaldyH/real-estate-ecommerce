package config

func InitDB() {
	connectDB()
	migrateDB()
}
