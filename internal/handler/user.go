package handler

import (
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/dto"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/service"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/response"
	"github.com/gin-gonic/gin"
)

// Interface
type UserHandler interface {
	RegisterUser(c *gin.Context)
	GetUserByUsername(c *gin.Context)
	UpdateUser(c *gin.Context)
	GetAllUser(c *gin.Context)
	DeleteUser(c *gin.Context)
}

// Impelement

type userHandler struct {
	service service.UserService
}

func NewUserHandler(s service.UserService) UserHandler {
	return &userHandler{service: s}
}

// Method

func (h *userHandler) RegisterUser(c *gin.Context) {
	var req dto.CreateUserRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		logger.Log.Info("Bad Request, Bad Format")
		response.BadRequest(c, err.Error())
		return
	}

	res, err := h.service.CreateUser(req)
	if err != nil {
		logger.Log.Info("Failed to create user")
		response.InternalError(c, err.Error())
		return
	}

	response.Created(c, "Registration successful", res)
}

func (h *userHandler) GetUserByUsername(c *gin.Context) {
	req := dto.GetUserRequest{
		Username: c.Param("username"),
	}
	res, err := h.service.GetUser(req)
	if err != nil {
		response.NotFound(c, err.Error())
	}

	response.OK(c, "OK", res)
}

func (h *userHandler) UpdateUser(c *gin.Context) {
	username := c.MustGet("username").(string)
	var req dto.ModifyUserRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		logger.Log.Info("Bad Request, Bad Format")
		response.BadRequest(c, err.Error())
		return
	}

	res, err := h.service.PutUser(username, req)
	if err != nil {
		logger.Log.Info("Bad Request, Bad Format")
		response.BadRequest(c, err.Error())
		return
	}
	response.OK(c, "Update OK", res)
}

func (h *userHandler) GetAllUser(c *gin.Context) {
	res, err := h.service.GetUsers()
	if err != nil {
		logger.Log.Info("internal server error")
		response.InternalError(c, err.Error())
		return
	}
	response.OK(c, "OK", res)
}

func (h *userHandler) DeleteUser(c *gin.Context) {
	username := c.MustGet("username").(string)
	err := h.service.DeleteUser(username)
	if err != nil {
		logger.Log.Info("bad request")
		response.BadRequest(c, err.Error())
		return
	}
	response.OK(c, "OK", nil)
}
