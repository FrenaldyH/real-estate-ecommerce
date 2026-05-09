package dto

type ChatMessage struct {
	Role    string `json:"role"    binding:"required,oneof=user assistant"`
	Content string `json:"content" binding:"required"`
}

type ChatRequest struct {
	Message string        `json:"message" binding:"required"`
	History []ChatMessage `json:"history"`
}
