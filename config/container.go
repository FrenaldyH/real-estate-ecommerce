package config

func InitDB() {
	connectDB()
	dropDB()
	migrateDB()
}
