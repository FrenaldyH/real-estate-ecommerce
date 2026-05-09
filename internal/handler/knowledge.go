package handler

import (
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/dto"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/service"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/response"
	"github.com/gin-gonic/gin"
)

type AIHandler struct {
	aiService service.AIService
}

func NewAIHandler(aiService service.AIService) *AIHandler {
	return &AIHandler{aiService: aiService}
}

// POST /api/ai/chat
func (h *AIHandler) Chat(c *gin.Context) {
	var req dto.ChatRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, err.Error())
		return
	}

	resp, err := h.aiService.Chat(c.Request.Context(), req)
	if err != nil {
		response.InternalError(c, err.Error())
		return
	}

	response.OK(c, "success", resp)
}

// POST /api/ai/reindex — re-indexes all knowledge sources (owner only)
func (h *AIHandler) ReIndex(c *gin.Context) {
	ctx := c.Request.Context()

	if err := h.aiService.IndexBusinessContext(ctx); err != nil {
		logger.Log.Error("re-index: business context failed", "error", err.Error())
		response.InternalError(c, "indexing business context failed: "+err.Error())
		return
	}

	if err := h.aiService.IndexFAQ(ctx); err != nil {
		logger.Log.Error("re-index: FAQ failed", "error", err.Error())
		response.InternalError(c, "indexing FAQ failed: "+err.Error())
		return
	}

	if err := h.aiService.IndexProperties(ctx); err != nil {
		logger.Log.Error("re-index: properties failed", "error", err.Error())
		response.InternalError(c, "indexing properties failed: "+err.Error())
		return
	}

	logger.Log.Info("re-indexing completed successfully")
	response.OK(c, "re-indexing completed", nil)
}
