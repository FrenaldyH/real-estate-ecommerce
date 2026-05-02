package jwt

import (
	"errors"
	"os"
	"strconv"
	"time"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
	"github.com/golang-jwt/jwt/v4"
)

type Claims struct {
	UserID uint   `json:"user_id"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}

var (
	ErrInvalidToken = errors.New("token invalid")
	ErrExpiredToken = errors.New("token expired")
)

func getSecretKey() []byte {
	secretKey := os.Getenv("JWT_KEY")
	if secretKey == "" {
		logger.Log.Warn("Secret key not found")
		os.Exit(1)
	}
	return []byte(secretKey)
}

func GenerateToken(userID uint, role string) (string, error) {
	// [NOTES] time.Minutes ntar  ganti time.Hours
	duration, _ := strconv.Atoi(os.Getenv("JWT_EXP"))
	if duration == 0 {
		logger.Log.Warn("JWT expired duration not found")
		duration = 5
	}

	expDuration := time.Duration(duration) * time.Minute

	claims := Claims{
		UserID: userID,
		Role:   role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(expDuration)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(getSecretKey())
}

func ValidateToken(tokenString string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, ErrInvalidToken
		}
		return getSecretKey(), nil
	})
	if err != nil {
		if errors.Is(err, jwt.ErrTokenExpired) {
			return nil, ErrExpiredToken
		}
		return nil, ErrInvalidToken
	}

	claims, ok := token.Claims.(*Claims)
	if !ok || !token.Valid {
		return nil, ErrInvalidToken
	}

	return claims, nil
}
