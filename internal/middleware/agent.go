package middleware

import (
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/response"
	"github.com/gin-gonic/gin"
)

func Agent() gin.HandlerFunc {
	return func(c *gin.Context) {
		role, exists := c.Get("role")
		if !exists {
			logger.Log.Info("Role not found in context")
			response.Unauthorized(c)
			c.Abort()
			return
		}

		role, ok := role.(string)
		if !ok {
			logger.Log.Error("Role context is not a string")
			response.InternalError(c, "Invalid role format in token")
			c.Abort()
			return
		}

		if role != string(model.RoleAgent) {
			logger.Log.Info("Access denied: user is not an agent")
			response.Forbidden(c)
			c.Abort()
			return
		}

		logger.Log.Debug("Agent access granted")
		c.Next()
	}
}
