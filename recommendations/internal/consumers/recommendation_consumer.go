package consumers

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/confluentinc/confluent-kafka-go/kafka"
	"log/slog"
	"recommendations/internal/domain/usecase"
)

type CreateRecommendationHandler struct {
	uc     *usecase.Recommendations
	logger *slog.Logger
}

func (r *CreateRecommendationHandler) Handle(msg kafka.Message) {
	log := r.logger.With("CreateRecommendationHandler.Handle")
	defer func() {
		if err := recover(); err != nil {
			log.Error(fmt.Sprintf("panic err %v", err))
		}
	}()

	var msgValue usecase.CreateRecommendation
	err := json.Unmarshal(msg.Value, &msgValue)
	if err != nil {
		log.Error("Error unmarshalling message", "message", string(msg.Value))
		return
	}

	err = r.uc.CreateRecommendation(context.Background(), msgValue)
	if err != nil {
		log.Error("Error creating recommendation", "error", err)
		return
	}
}

func NewCreateRecommendationHandler(uc *usecase.Recommendations, logger *slog.Logger) *CreateRecommendationHandler {
	return &CreateRecommendationHandler{
		uc:     uc,
		logger: logger,
	}
}

type DeleteRecommendationHandler struct {
	uc     *usecase.Recommendations
	logger *slog.Logger
}

func (r *DeleteRecommendationHandler) Handle(msg kafka.Message) {
	log := r.logger.With("DeleteRecommendationHandler.Handle")
	defer func() {
		if err := recover(); err != nil {
			log.Error(fmt.Sprintf("panic err %v", err))
			return
		}
	}()

	var msgValue usecase.DeleteRecommendation
	err := json.Unmarshal(msg.Value, &msgValue)
	if err != nil {
		log.Error("Error unmarshalling message", "message", string(msg.Value))
		return
	}

	err = r.uc.DeleteRecommendation(context.Background(), msgValue.ProfileID)
	if err != nil {
		log.Error("Error deleting recommendation", "error", err.Error())
	}
}

func NewDeleteRecommendationHandler(uc *usecase.Recommendations, logger *slog.Logger) *DeleteRecommendationHandler {
	return &DeleteRecommendationHandler{
		logger: logger,
		uc:     uc,
	}
}
