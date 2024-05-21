package consumers

import (
	"context"
	"encoding/json"
	"github.com/confluentinc/confluent-kafka-go/kafka"
	"log/slog"
	"worker/internal/usecase"
)

type ProfileHandler struct {
	uc     *usecase.Worker
	logger *slog.Logger
}

func (h *ProfileHandler) Handle(msg kafka.Message) {
	log := h.logger.With("ProfileHandler")

	var dto usecase.ProfileDTO
	err := json.Unmarshal(msg.Value, &dto)
	if err != nil {
		log.Error("Error unmarshalling message", "error", err)
		return
	}

	h.uc.ProcessProfile(context.Background(), &dto)
}

func NewProfileHandler(uc *usecase.Worker, logger *slog.Logger) *ProfileHandler {
	return &ProfileHandler{
		uc:     uc,
		logger: logger,
	}
}
