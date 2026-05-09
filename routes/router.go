package routes

import (
	"time"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/handler"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/middleware"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/repository"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/service"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRouter(db *gorm.DB) *gin.Engine {
	r := gin.Default()

	// [CORS]
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "https://example.com"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// [REPOSITORY LAYER]
	userRepo := repository.NewUserRepository(db)
	agentRepo := repository.NewAgentRepository(db)
	propertyRepo := repository.NewPropertyRepository(db)
	imageRepo := repository.NewPropertyImageRepository(db)
	facilityRepo := repository.NewPropertyFacilityRepository(db)
	wishlistRepo := repository.NewWishlistRepository(db)
	reviewRepo := repository.NewReviewRepository(db)

	// [SERVICE LAYER]
	userService := service.NewUserService(userRepo)
	agentService := service.NewAgentService(agentRepo, userRepo)
	authService := service.NewAuthService(userRepo)
	propertyService := service.NewPropertyService(propertyRepo, imageRepo, facilityRepo, agentRepo)
	wishlistService := service.NewWishlistService(wishlistRepo, userRepo)
	reviewService := service.NewReviewService(reviewRepo, userRepo)

	// [HANDLER LAYER]
	agentHandler := handler.NewAgentHandler(agentService)
	userHandler := handler.NewUserHandler(userService)
	authHandler := handler.NewAuthHandler(authService)
	propertyHandler := handler.NewPropertyHandler(propertyService)
	wishlistHandler := handler.NewWishlistHandler(wishlistService)
	reviewHandler := handler.NewReviewHandler(reviewService)

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
		agent.DELETE("", middleware.Auth(), middleware.Agent(), agentHandler.DeleteAgent)
		agent.GET("/:username", agentHandler.GetAgentByUsername)
		agent.PUT("/:username", middleware.Auth(), middleware.Agent(), agentHandler.UpdateAgent)
	}

	property := api.Group("/property")
	{
		// GET /api/property          → semua property
		// GET /api/property?city=    → filter by city
		// GET /api/property?province → filter by province
		// GET /api/property?type=    → filter by property type name
		// GET /api/property?status=  → filter by status
		// GET /api/property?listing-type= → filter by listing type
		// GET /api/property?min=&max=     → filter by price range
		property.GET("", propertyHandler.GetAll)
		property.GET("/:id", propertyHandler.GetByID)
		property.GET("/:id/images", propertyHandler.GetImages)
		property.GET("/:id/facility", propertyHandler.GetFacilities)
		property.GET("/:id/review", reviewHandler.GetReviews)
		property.POST("/:id/review", middleware.Auth(), reviewHandler.CreateReview)

		protectedProperty := property.Group("").Use(middleware.Auth(), middleware.Agent())
		{
			protectedProperty.POST("", propertyHandler.PostProperty)
			protectedProperty.PUT("/:id", propertyHandler.PutProperty)
			protectedProperty.DELETE("/:id", propertyHandler.DeleteProperty)

			protectedProperty.POST("/:id/image", propertyHandler.PostPropertyImage)
			protectedProperty.DELETE("/:id/image/:image_id", propertyHandler.DeletePropertyImage)
		}
	}

	wishlist := api.Group("/wishlist").Use(middleware.Auth())
	{
		wishlist.GET("", wishlistHandler.GetUserWishlists)
		wishlist.POST("", wishlistHandler.CreateUserWishlist)
		wishlist.DELETE("/:wishlist-id", wishlistHandler.DeleteUserWishlist)
	}

	review := api.Group("/review").Use(middleware.Auth())
	{
		review.PUT("/:property_id", reviewHandler.UpdateReview)
		review.DELETE("/:property_id", reviewHandler.DeleteReview)
	}

	return r
}
