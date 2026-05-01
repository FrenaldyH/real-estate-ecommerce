package repository

import (
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"gorm.io/gorm"
)

// Interface

type AgentRepository interface {
	Create(agent *model.Agent) error
	FindByID(id uint) (*model.Agent, error)
	FindByUserID(userID uint) (*model.Agent, error)
	FindAll() ([]model.Agent, error)
	FindByTotalPropertiesSold(limit int) ([]model.Agent, error)
	Update(agent model.Agent) error
	Delete(id uint) error
}

// Implement

type agentRepository struct {
	db *gorm.DB
}

func NewAgentRepository(db *gorm.DB) AgentRepository {
	return &agentRepository{db: db}
}

// Method

func (r *agentRepository) Create(agent *model.Agent) error {
	return r.db.Create(agent).Error
}

func (r *agentRepository) FindByID(id uint) (*model.Agent, error) {
	var agent model.Agent
	err := r.db.
		Joins("User").
		Joins("Agency").
		First(&agent, id).Error
	return &agent, err
}

func (r *agentRepository) FindByUserID(userID uint) (*model.Agent, error) {
	var agent model.Agent
	err := r.db.
		Joins("User").
		Joins("Agency").
		Where("user_id = ?", userID).
		First(&agent).Error
	return &agent, err
}

func (r *agentRepository) FindAll() ([]model.Agent, error) {
	var agents []model.Agent
	err := r.db.
		Joins("User").
		Joins("Agency").
		Find(&agents).Error
	return agents, err
}

func (r *agentRepository) FindByTotalPropertiesSold(limit int) ([]model.Agent, error) {
	var agents []model.Agent
	err := r.db.
		Joins("User").
		Joins("Agency").
		Order("total_properties_sold DESC").
		Limit(limit).
		Find(&agents).Error
	return agents, err
}

func (r *agentRepository) Update(agent model.Agent) error {
	return r.db.Save(agent).Error
}

func (r *agentRepository) Delete(id uint) error {
	return r.db.Delete(&model.Agent{}, id).Error
}
