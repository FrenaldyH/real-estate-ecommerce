package middleware

import (
	"strings"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/jwt"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/response"
	"github.com/gin-gonic/gin"
)

func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Ambil header Authorization
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			logger.Log.Info("Authorization header not found")
			response.Unauthorized(c)
			c.Abort()
			return
		}

		// Format harus "Bearer <token>"
		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			logger.Log.Info("Invalid authorization format")
			response.Unauthorized(c)
			c.Abort()
			return
		}

		// Validasi token
		claims, err := jwt.ValidateToken(parts[1])
		if err != nil {
			logger.Log.Info("Invalid or expired token")
			response.Unauthorized(c)
			c.Abort()
			return
		}

		// Simpan ke context → dipakai handler
		c.Set("username", claims.Username)
		c.Set("role", claims.Role)

		logger.Log.Debug("User authenticated: " + claims.Username)
		c.Next()
	}
}
