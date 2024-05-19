package rest

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"net/http"
	"recommendations/internal/domain/usecase"
	"strconv"
)

const UserIDHeader = "X-User-Id"

func (h *Handler) ListRecommendations(c *gin.Context) {
	userIdStr := c.GetHeader(UserIDHeader)
	if userIdStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "missing user id"})
		return
	}
	userId, err := uuid.Parse(userIdStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error parsing user id to uuid"})
		return
	}

	limitStr := c.Query("limit")
	limit, err := strconv.Atoi(limitStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error parsing limit to int"})
		return
	}
	if limit < 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid limit"})
		return
	}

	category := c.Query("category")
	if category == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "missing category"})
		return
	}

	list, err := h.uc.GetRecommendations(c, usecase.GetRecommendationsRequest{
		Category:  category,
		ProfileID: userId,
		Limit:     limit,
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "INTERNAL_ERROR"})
		return
	}

	c.JSON(http.StatusOK, list)
}
