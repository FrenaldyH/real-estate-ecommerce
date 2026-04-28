package config

func InitDB() {
	ConnectDB()
	MigrateDB()
	DropDB()
}
