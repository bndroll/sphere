package app

import (
	"context"
	"github.com/confluentinc/confluent-kafka-go/kafka"
	"log/slog"
	"net/http"
	"os"
	"worker/internal/consumers"
	"worker/internal/env"
	"worker/internal/kafkalib"
	"worker/internal/usecase"
)

type App struct {
	httpServer         *http.Server
	swipeTopicConsumer *kafka.Consumer
	logger             *slog.Logger
}

func (a *App) Run() {
	a.logger = setupLogger()

	producer := kafkalib.NewProducer(a.logger)
	uc := usecase.NewWorker(env.RecSysURL, a.logger, producer, env.KafkaRecommendationsTopic)
	a.runRecommendationConsumer(uc)
}

func (a *App) runRecommendationConsumer(uc *usecase.Worker) {
	handler := consumers.NewProfileHandler(uc, a.logger)
	consumer := kafkalib.NewKafkaConsumer(handler, a.logger)
	consumer.StartConsumer(env.KafkaProfileTopic)
}

func (a *App) Shutdown(ctx context.Context) error {
	return a.httpServer.Shutdown(ctx)
}

func setupLogger() *slog.Logger {
	return slog.New(slog.NewTextHandler(os.Stderr, nil))
}
