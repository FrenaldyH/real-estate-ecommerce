package handler

import (
	"errors"
	"strconv"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/dto"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/service"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/response"
	"github.com/gin-gonic/gin"
)

type WishlistHandler interface {
	GetUserWishlists(c *gin.Context)
	CreateUserWishlist(c *gin.Context)
	DeleteUserWishlist(c *gin.Context)
}

type wishlistHandler struct {
	wishlistService service.WishlistService
}

func NewWishlistHandler(wishlistService service.WishlistService) WishlistHandler {
	return &wishlistHandler{wishlistService: wishlistService}
}

func (h *wishlistHandler) GetUserWishlists(c *gin.Context) {
	username, err := getUsername(c)
	if err != nil {
		response.Unauthorized(c)
		return
	}

	wishlists, err := h.wishlistService.GetUserWishlists(username)
	if err != nil {
		response.InternalError(c, err.Error())
		return
	}

	response.OK(c, "berhasil mengambil data wishlist", wishlists)
}

func (h *wishlistHandler) CreateUserWishlist(c *gin.Context) {
	username, err := getUsername(c)
	if err != nil {
		response.Unauthorized(c)
		return
	}

	var req dto.CreateWishlistRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, err.Error())
		return
	}

	wishlist, err := h.wishlistService.CreateUserWishlist(username, req)
	if err != nil {
		if err.Error() == "property already in wishlist" {
			response.ValidationError(c, err.Error())
			return
		}
		response.InternalError(c, err.Error())
		return
	}

	response.Created(c, "property berhasil ditambahkan ke wishlist", wishlist)
}

func (h *wishlistHandler) DeleteUserWishlist(c *gin.Context) {
	username, err := getUsername(c)
	if err != nil {
		response.Unauthorized(c)
		return
	}

	wishlistID, err := strconv.ParseUint(c.Param("wishlist-id"), 10, 64)
	if err != nil {
		response.BadRequest(c, "wishlist-id tidak valid")
		return
	}

	if err := h.wishlistService.DeleteUserWishlist(uint(wishlistID), username); err != nil {
		switch err.Error() {
		case "wishlist not found":
			response.NotFound(c, err.Error())
		case "forbidden: wishlist does not belong to you":
			response.Forbidden(c)
		default:
			response.InternalError(c, err.Error())
		}
		return
	}

	response.OK(c, "wishlist berhasil dihapus", nil)
}

func getUsername(c *gin.Context) (string, error) {
	val, exists := c.Get("username")
	if !exists {
		return "", errors.New("username tidak ada di context")
	}
	username, ok := val.(string)
	if !ok || username == "" {
		return "", errors.New("username tidak valid")
	}
	return username, nil
}
