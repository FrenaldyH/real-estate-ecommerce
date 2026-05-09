package gemini

import (
	"context"
	"fmt"
	"strings"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

type Client struct {
	client *genai.Client
}

func NewClient(apiKey string) (*Client, error) {
	ctx := context.Background()
	c, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		return nil, fmt.Errorf("failed to create gemini client: %w", err)
	}
	return &Client{client: c}, nil
}

func (c *Client) Close() {
	c.client.Close()
}

// Embed converts text to a 3072-dimensional vector using gemini-embedding-001 (v1beta).
func (c *Client) Embed(ctx context.Context, text string) ([]float32, error) {
	em := c.client.EmbeddingModel("gemini-embedding-001")
	res, err := em.EmbedContent(ctx, genai.Text(text))
	if err != nil {
		return nil, fmt.Errorf("embedding failed: %w", err)
	}
	return res.Embedding.Values, nil
}

// ChatMessage represents a single turn in a conversation.
type ChatMessage struct {
	Role    string // "user" or "model"
	Content string
}

// Generate produces a response given a system prompt, conversation history, and a new user message.
func (c *Client) Generate(ctx context.Context, systemPrompt string, history []ChatMessage, userMessage string) (string, error) {
	model := c.client.GenerativeModel("gemini-2.5-flash")
	model.SystemInstruction = &genai.Content{
		Parts: []genai.Part{genai.Text(systemPrompt)},
	}

	// Map history to Gemini's format; Gemini uses "model" instead of "assistant"
	var geminiHistory []*genai.Content
	for _, h := range history {
		role := h.Role
		if role == "assistant" {
			role = "model"
		}
		geminiHistory = append(geminiHistory, &genai.Content{
			Role:  role,
			Parts: []genai.Part{genai.Text(h.Content)},
		})
	}

	session := model.StartChat()
	session.History = geminiHistory

	resp, err := session.SendMessage(ctx, genai.Text(userMessage))
	if err != nil {
		return "", fmt.Errorf("generation failed: %w", err)
	}

	var sb strings.Builder
	for _, cand := range resp.Candidates {
		for _, part := range cand.Content.Parts {
			if t, ok := part.(genai.Text); ok {
				sb.WriteString(string(t))
			}
		}
	}

	return sb.String(), nil
}
