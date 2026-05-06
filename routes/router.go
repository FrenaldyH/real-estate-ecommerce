package routes

import (
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/handler"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/middleware"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/repository"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/service"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRouter(db *gorm.DB) *gin.Engine {
	r := gin.Default()

	// [REPOSITORY LAYER]
	userRepo := repository.NewUserRepository(db)
	agentRepo := repository.NewAgentRepository(db)

	// [SERVICE LAYER]
	userService := service.NewUserService(userRepo)
	agentService := service.NewAgentService(agentRepo, userRepo)
	authService := service.NewAuthService(userRepo)

	// [HANDLER LAYER]
	agentHandler := handler.NewAgentHandler(agentService)
	userHandler := handler.NewUserHandler(userService)
	authHandler := handler.NewAuthHandler(authService)

	api := r.Group("/api")

	// [PUBLIK]
	api.POST("/login", authHandler.Login)

	user := api.Group("/user")
	{
		user.GET("", userHandler.GetAllUser)
		user.POST("", userHandler.RegisterUser)
		user.DELETE("", middleware.Auth(), userHandler.DeleteUser)
		user.GET("/:username", userHandler.GetUserByUsername)
		user.PUT("/:username", middleware.Auth(), userHandler.UpdateUser)
	}

	agent := api.Group("/agent")
	{
		agent.GET("", agentHandler.GetAllAgent)
		agent.POST("", middleware.Auth(), agentHandler.RegisterAgent)
		agent.GET("/top", agentHandler.GetTopAgents)
		agent.GET("/:username", agentHandler.GetAgentByUsername)
		agent.PUT("/:username", middleware.Auth(), middleware.Agent(), agentHandler.UpdateAgent)
		agent.DELETE("/:username", agentHandler.DeleteAgent)
	}

	return r
}
