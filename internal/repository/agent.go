package repository

import (
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
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

// Helper

func (r *agentRepository) baseQuery() *gorm.DB {
	return r.db.
		Joins("Users").
		Joins("Agency")
}

// Method

func (r *agentRepository) Create(agent *model.Agent) error {
	return r.db.Create(agent).Error
}

func (r *agentRepository) FindByID(id uint) (*model.Agent, error) {
	var agent model.Agent
	err := r.baseQuery().
		First(&agent, id).Error
	if err != nil {
		logger.Log.Info("ID not found")
		return nil, err
	}

	return &agent, err
}

func (r *agentRepository) FindByUserID(userID uint) (*model.Agent, error) {
	var agent model.Agent
	err := r.baseQuery().
		Where("user_id = ?", userID).
		First(&agent).Error
	if err != nil {
		logger.Log.Info("User ID not found")
		return nil, err
	}

	return &agent, err
}

func (r *agentRepository) FindAll() ([]model.Agent, error) {
	var agents []model.Agent
	err := r.baseQuery().
		Find(&agents).Error
	return agents, err
}

func (r *agentRepository) FindByTotalPropertiesSold(limit int) ([]model.Agent, error) {
	var agents []model.Agent
	err := r.baseQuery().
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
