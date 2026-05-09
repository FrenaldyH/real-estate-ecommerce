package handler

import (
	"strconv"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/dto"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/service"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/response"
	"github.com/gin-gonic/gin"
)

// Interface

type AgentHandler interface {
	RegisterAgent(c *gin.Context)
	GetAgentByUsername(c *gin.Context)
	GetTopAgents(c *gin.Context)
	UpdateAgent(c *gin.Context)
	GetAllAgent(c *gin.Context)
	DeleteAgent(c *gin.Context)
}

// Implement

type agentHandler struct {
	service service.AgentService
}

func NewAgentHandler(s service.AgentService) AgentHandler {
	return &agentHandler{service: s}
}

// Method

func (h *agentHandler) RegisterAgent(c *gin.Context) {
	var req dto.CreateAgentRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		logger.Log.Info("bad request")
		response.ValidationError(c, err.Error())
		return
	}

	username := c.MustGet("username").(string)

	res, err := h.service.CreateAgent(username, req)
	if err != nil {
		logger.Log.Info("bad request")
		response.BadRequest(c, err.Error())
		return
	}

	response.Created(c, "Agent profile created successfully", res)
}

// GetMyProfile mengambil data profil agen milik user yang sedang login
func (h *agentHandler) GetAgentByUsername(c *gin.Context) {
	req := dto.GetAgentRequest{
		Username: c.Param("username"),
	}

	res, err := h.service.GetAgent(req)
	if err != nil {
		logger.Log.Info("not found")
		response.NotFound(c, err.Error())
		return
	}

	response.OK(c, "Agent profile retrieved successfully", res)
}

func (h *agentHandler) GetTopAgents(c *gin.Context) {
	limitStr := c.DefaultQuery("limit", "10")
	limitUint64, err := strconv.ParseUint(limitStr, 10, 32)
	if err != nil {
		response.BadRequest(c, "Limit must be a positive integer.")
		return
	}

	req := dto.GetTopAgentRequest{
		Limit: uint(limitUint64),
	}

	res, err := h.service.TopAgent(req)
	if err != nil {
		logger.Log.Info("komtol")
		response.InternalError(c, err.Error())
		return
	}

	response.OK(c, "Top agents retrieved successfully", res)
}

// UpdateAgent memperbarui data profil agen
func (h *agentHandler) UpdateAgent(c *gin.Context) {
	var req dto.UpdateAgentRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		logger.Log.Info("bad request")
		response.ValidationError(c, err.Error())
		return
	}

	username := c.MustGet("username").(string)

	res, err := h.service.PutAgent(username, req)
	if err != nil {
		logger.Log.Info("bad request")
		response.BadRequest(c, err.Error())
		return
	}

	response.OK(c, "Agent profile updated successfully", res)
}

func (h *agentHandler) GetAllAgent(c *gin.Context) {
	res, err := h.service.GetAgents()
	if err != nil {
		logger.Log.Info("internal server error")
		response.InternalError(c, err.Error())
		return
	}

	response.OK(c, "All agents retrieved successfully", res)
}

func (h *agentHandler) DeleteAgent(c *gin.Context) {
	username := c.MustGet("username").(string)

	err := h.service.DeleteAgent(username)
	if err != nil {
		logger.Log.Info("bad request")
		response.BadRequest(c, err.Error())
		return
	}

	response.OK(c, "Agent deleted successfully", nil)
}
