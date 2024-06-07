package consumers

import (
	"encoding/json"
	"github.com/confluentinc/confluent-kafka-go/kafka"
	"log/slog"
	"notifications/internal/telegram"
)

type SwipeHandler struct {
	uc     *telegram.Service
	logger *slog.Logger
}

func (s *SwipeHandler) Handle(msg kafka.Message) {
	defer func() {
		if r := recover(); r != nil {
			s.logger.Error("error while handling", "error", r)
		}
	}()
	log := s.logger.With("CreateRecommendationHandler.Handle")

	var msgValue telegram.CreateReactionRequest
	err := json.Unmarshal(msg.Value, &msgValue)
	if err != nil {
		log.Error("Error unmarshalling message")
		return
	}

	s.uc.Notify(msgValue)
}

func NewSwipeHandler(uc *telegram.Service, logger *slog.Logger) *SwipeHandler {
	return &SwipeHandler{
		uc:     uc,
		logger: logger,
	}
}
