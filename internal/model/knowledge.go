package model

import (
	"time"

	"github.com/pgvector/pgvector-go"
)

type ChunkSource string

const (
	ChunkSourceProperty ChunkSource = "property"
	ChunkSourceFAQ      ChunkSource = "faq"
	ChunkSourceBusiness ChunkSource = "business"
)

// KnowledgeChunk stores a text snippet and its vector embedding for RAG retrieval.
type KnowledgeChunk struct {
	ID        uint            `gorm:"primaryKey;autoIncrement"          json:"id"`
	Source    ChunkSource     `gorm:"type:varchar(20);not null;index"   json:"source"`
	RefID     *uint           `gorm:"index"                             json:"ref_id,omitempty"` // PropertyID when source=property
	Title     string          `gorm:"not null"                          json:"title"`
	Content   string          `gorm:"type:text;not null"                json:"content"`
	Embedding pgvector.Vector `gorm:"type:vector(3072)"                 json:"-"`
	CreatedAt time.Time       `gorm:"autoCreateTime"                    json:"created_at"`
	UpdatedAt time.Time       `gorm:"autoUpdateTime"                    json:"updated_at"`
}

func (KnowledgeChunk) TableName() string {
	return "knowledge_chunks"
}
