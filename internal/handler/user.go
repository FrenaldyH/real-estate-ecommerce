package handler

import (
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/dto/request"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/service"
	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	service service.UserService
}

func NewUserHandler(s *service.UserService) *UserHandler {
	return &UserHandler{service: *s}
}

func (h *UserHandler) Register(c *gin.Context) {
	var req request.CreateUserRequest
	
	if err := c.ShouldBind(&req); err != nil {
		response.
	}
}
