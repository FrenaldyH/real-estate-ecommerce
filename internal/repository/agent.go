package repository

import (
	"errors"
	"fmt"

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
	FindBySIUP4(siup4 string) (*model.Agent, error)
	FindAgentIDByUsername(username string) (uint, error)
	Update(id uint, agentData map[string]any, userData map[string]any) (*model.Agent, error)
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
		Joins("User").
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
	err := r.db.
		Where("user_id = ?", userID).
		First(&agent).Error
	if err != nil {
		logger.Log.Info("User ID not found")
		return nil, err
	}

	return &agent, err
}

func (r *agentRepository) FindBySIUP4(siup4 string) (*model.Agent, error) {
	var agent model.Agent
	err := r.db.
		Where("siup4 = ?", siup4).
		First(&agent).Error
	if err != nil {
		logger.Log.Info("SIUP4 not found")
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

func (r *agentRepository) Update(id uint, agentData map[string]any, userData map[string]any) (*model.Agent, error) {
	var updatedAgent *model.Agent

	err := r.db.Transaction(func(tx *gorm.DB) error {
		// [CARI DATA AGENT]
		agent, _ := r.FindByID(id)
		if agent == nil {
			return errors.New("Agent not found")
		}

		// [UPDATE TABEL USER]
		if len(userData) > 0 {
			if err := tx.Model(&model.User{}).
				Where("id = ?", agent.UserID).
				Updates(userData).Error; err != nil {
				return errors.New("Failed to update user data")
			}
		}

		// [UPDATE TABEL AGENT]
		if len(agentData) > 0 {
			if err := tx.Model(&model.Agent{}).
				Where("id = ?", agent.ID).
				Updates(agentData).Error; err != nil {
				return errors.New("Failed to update agent data")
			}
		}

		if err := tx.Joins("User").
			Joins("Agency").
			Where("agents.id = ?", agent.ID).
			First(&agent).Error; err != nil {
			return errors.New("Failed fetch data")
		}

		updatedAgent = agent
		return nil
	})
	if err != nil {
		return nil, err
	}

	return updatedAgent, nil
}

func (r *agentRepository) Delete(id uint) error {
	return r.db.Delete(&model.Agent{}, id).Error
}

func (r *agentRepository) FindAgentIDByUsername(username string) (uint, error) {
	var agent model.Agent

	err := r.db.
		Joins("JOIN users ON users.id = agents.user_id").
		Where("users.username = ?", username).
		First(&agent).Error
	if err != nil {
		logger.Log.Error(fmt.Sprintf("Agent not found for username %s: %v", username, err))
		return 0, errors.New("agent profile not found")
	}

	return agent.ID, nil
}
