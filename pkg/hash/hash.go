package hash

import (
	"fmt"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		logger.Log.Warn(fmt.Sprintf("Failed to hash Password: %v", err))
		return "", err
	}
	logger.Log.Debug("Successfully hashed password")
	return string(hashed), err
}

func CheckPassword(hashed string, plain string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashed), []byte(plain))
	if err != nil {
		logger.Log.Info("Password verification failed")
		return false
	}
	logger.Log.Debug("Password verified successfully")
	return true
}
