package rest

import (
	"gateway/internal/env"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"net/http"
)

func (h Handler) SwipeReaction(c *gin.Context) {
	log := h.logger.With("Handler.SwipeReaction")

	var req CreateReactionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		log.Error("invalid request body", "error", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	err := h.producer.SendMessage(env.KafkaSwipeTopic, req)
	if err != nil {
		log.Error("failed to produce message", "error", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "error produce message",
		})
	}

	c.JSON(http.StatusNoContent, nil)
}

type CreateReactionRequest struct {
	ProfileID    uuid.UUID `json:"profileId"`
	RecProfileID uuid.UUID `json:"recProfileId"`
	Type         string    `json:"type"`
}
