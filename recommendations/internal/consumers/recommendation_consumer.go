package consumers

import (
	"context"
	"encoding/json"
	"github.com/confluentinc/confluent-kafka-go/kafka"
	"log/slog"
	"recommendations/internal/domain/usecase"
)

type RecommendationHandler struct {
	uc     *usecase.Recommendations
	logger *slog.Logger
}

func (r *RecommendationHandler) Handle(msg kafka.Message) {
	log := r.logger.With("RecommendationHandler.Handle")

	var msgValue usecase.CreateRecommendation
	err := json.Unmarshal(msg.Value, &msgValue)
	if err != nil {
		log.Error("Error unmarshalling message")
		return
	}

	err = r.uc.CreateRecommendation(context.Background(), msgValue)
	if err != nil {
		log.Error("Error creating recommendation", "error", err)
		return
	}
}

func NewRecommendationHandler(uc *usecase.Recommendations, logger *slog.Logger) *RecommendationHandler {
	return &RecommendationHandler{
		uc:     uc,
		logger: logger,
	}
}
