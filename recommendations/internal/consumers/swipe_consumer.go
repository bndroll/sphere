package consumers

import (
	"context"
	"encoding/json"
	"github.com/confluentinc/confluent-kafka-go/kafka"
	"log/slog"
	"recommendations/internal/domain/usecase"
)

type SwipeHandler struct {
	uc     *usecase.Recommendations
	logger *slog.Logger
}

func (s *SwipeHandler) Handle(msg kafka.Message) {
	log := s.logger.With("CreateRecommendationHandler.Handle")

	var msgValue usecase.CreateReactionRequest
	err := json.Unmarshal(msg.Value, &msgValue)
	if err != nil {
		log.Error("Error unmarshalling message")
		return
	}

	err = s.uc.CreateReaction(context.Background(), msgValue)
	if err != nil {
		log.Error("Error creating recommendation", "error", err)
		return
	}
}

func NewSwipeHandler(uc *usecase.Recommendations, logger *slog.Logger) *SwipeHandler {
	return &SwipeHandler{
		uc:     uc,
		logger: logger,
	}
}
