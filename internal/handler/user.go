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
	Register(c *gin.Context)
	Login(c *gin.Context)
	GetByUsername(c *gin.Context)
	Update(c *gin.Context)
	GetAll(c *gin.Context)
}

type userHandler struct {
	service service.UserService
}

func NewUserHandler(s service.UserService) UserHandler {
	return &userHandler{service: s}
}

func (h *userHandler) Register(c *gin.Context) {
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

func (h *userHandler) Login(c *gin.Context) {
	var req dto.LoginRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		logger.Log.Info("Bad Request, Bad Format")
		response.BadRequest(c, err.Error())
		return
	}

	res, err := h.service.LoginUser(req)
	if err != nil {
		logger.Log.Info("Bad Request, Bad Format")
		response.BadRequest(c, err.Error())
		return
	}

	response.OK(c, "Successfully Login", res)
}

func (h *userHandler) GetByUsername(c *gin.Context) {
	req := dto.GetUserRequest{
		Username: c.Param("username"),
	}
	res, err := h.service.GetUser(req)
	if err != nil {
		response.NotFound(c, err.Error())
	}

	response.OK(c, "OK", res)
}

func (h *userHandler) Update(c *gin.Context) {
	username := c.Param("username")
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

func (h *userHandler) GetAll(c *gin.Context) {
	res, err := h.service.GetUsers()
	if err != nil {
		response.InternalError(c, err.Error())
		return
	}
	response.OK(c, "OK", res)
}
