package routes

import (
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/handler"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/repository"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/service"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRouter(db *gorm.DB) *gin.Engine {
	r := gin.Default()

	userRepo := repository.NewUserRepository(db)

	userService := service.NewUserService(userRepo)

	userHandler := handler.NewUserHandler(userService)

	api := r.Group("/api")

	user := api.Group("/user")
	{
		user.GET("", userHandler.GetAll)
		user.GET("/:username", userHandler.GetByUsername)
		user.PUT("/:username", userHandler.Update)
		user.POST("", userHandler.Register)
	}

	return r
}
