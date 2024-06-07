package app

import (
	"log/slog"
	"net/http"
	"notifications/internal/consumers"
	"notifications/internal/env"
	"notifications/internal/kafkalib"
	"notifications/internal/telegram"
	"os"
)

type App struct {
	httpServer *http.Server
	err        chan error
}

func (a *App) Run() error {
	a.err = make(chan error)
	defer close(a.err)
	l := setupLogger()

	service := telegram.NewService(env.TelegramToken, l)

	a.runSwipeConsumer(service, l)

	return nil
}

func (a *App) runSwipeConsumer(service *telegram.Service, logger *slog.Logger) {
	handler := consumers.NewSwipeHandler(service, logger)
	consumer := kafkalib.NewKafkaConsumer(handler, logger)
	consumer.StartConsumer(env.KafkaSwipeTopic)
}

func setupLogger() *slog.Logger {
	return slog.New(slog.NewTextHandler(os.Stderr, nil))
}
