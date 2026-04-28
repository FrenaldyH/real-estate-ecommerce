package config_test

import (
	"testing"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/config"
)

func TestMigrateDB(t *testing.T) {
	config.MigrateDB()
	config.DropDB()
}
