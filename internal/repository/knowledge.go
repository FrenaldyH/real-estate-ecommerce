package repository

import (
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"github.com/pgvector/pgvector-go"
	"gorm.io/gorm"
)

type KnowledgeRepository interface {
	// SimilaritySearch mencari chunk paling relevan berdasarkan cosine distance
	SimilaritySearch(embedding pgvector.Vector, limit int) ([]model.KnowledgeChunk, error)
	Create(chunk *model.KnowledgeChunk) error
	BulkCreate(chunks []model.KnowledgeChunk) error
	DeleteBySource(source model.ChunkSource) error
	DeleteByRefID(refID uint) error
}

type knowledgeRepository struct {
	db *gorm.DB
}

func NewKnowledgeRepository(db *gorm.DB) KnowledgeRepository {
	return &knowledgeRepository{db: db}
}

func (r *knowledgeRepository) SimilaritySearch(embedding pgvector.Vector, limit int) ([]model.KnowledgeChunk, error) {
	var chunks []model.KnowledgeChunk
	// <=> = cosine distance (semakin kecil = semakin mirip)
	err := r.db.Raw(`
		SELECT id, source, ref_id, title, content, created_at, updated_at
		FROM knowledge_chunks
		ORDER BY embedding <=> ?
		LIMIT ?
	`, embedding, limit).Scan(&chunks).Error
	return chunks, err
}

func (r *knowledgeRepository) Create(chunk *model.KnowledgeChunk) error {
	return r.db.Create(chunk).Error
}

func (r *knowledgeRepository) BulkCreate(chunks []model.KnowledgeChunk) error {
	if len(chunks) == 0 {
		return nil
	}
	return r.db.CreateInBatches(chunks, 50).Error
}

func (r *knowledgeRepository) DeleteBySource(source model.ChunkSource) error {
	return r.db.Where("source = ?", source).Delete(&model.KnowledgeChunk{}).Error
}

func (r *knowledgeRepository) DeleteByRefID(refID uint) error {
	return r.db.Where("ref_id = ?", refID).Delete(&model.KnowledgeChunk{}).Error
}
