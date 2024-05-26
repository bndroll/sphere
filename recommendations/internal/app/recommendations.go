package app

import (
	"context"
	"github.com/confluentinc/confluent-kafka-go/kafka"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"log"
	"log/slog"
	"net/http"
	"os"
	"recommendations/internal/consumers"
	"recommendations/internal/domain/entity"
	"recommendations/internal/domain/usecase"
	"recommendations/internal/env"
	"recommendations/internal/kafkalib"
	"recommendations/internal/rest"
	"recommendations/internal/storage"
)

//TODO: setup db
//TODO: setup server
//TODO: setup docker
//TODO: init index for entity

type App struct {
	httpServer         *http.Server
	swipeTopicConsumer *kafka.Consumer
	logger             *slog.Logger
}

func (a *App) Run() error {
	a.logger = setupLogger()

	db := DB(env.DataSourceName)
	st := storage.New(db)

	uc := usecase.NewRecommendations(st, env.AccountURL, a.logger)
	go a.runCreateRecommendationConsumer(uc)
	go a.runSwipeConsumer(uc)
	go a.runDeleteRecommendationConsumer(uc)

	h := rest.New(uc, a.logger)
	router := h.Router()

	a.httpServer = &http.Server{
		Addr:    env.HttpPort,
		Handler: router,
	}

	if err := a.httpServer.ListenAndServe(); err != nil {
		return err
	}

	return nil
}

func DB(dsn string) *gorm.DB {
	config := &gorm.Config{
		Logger: logger.New(log.New(os.Stdout, "\r\n", log.LstdFlags), logger.Config{
			Colorful:                  true,
			IgnoreRecordNotFoundError: true,
			LogLevel:                  logger.Info,
		}),
	}

	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN: dsn,
	}), config)
	if err != nil {
		panic(err)
	}

	err = db.AutoMigrate(
		&entity.Recommendation{},
		&entity.Reaction{},
	)
	if err != nil {
		panic(err)
	}

	return db
}

func (a *App) runCreateRecommendationConsumer(uc *usecase.Recommendations) {
	handler := consumers.NewCreateRecommendationHandler(uc, a.logger)
	consumer := kafkalib.NewKafkaConsumer(handler, a.logger)
	consumer.StartConsumer(env.KafkaRecommendationsTopic)
}
func (a *App) runDeleteRecommendationConsumer(uc *usecase.Recommendations) {
	handler := consumers.NewDeleteRecommendationHandler(uc, a.logger)
	consumer := kafkalib.NewKafkaConsumer(handler, a.logger)
	consumer.StartConsumer(env.KafkaDeleteRecommendationsTopic)
}

func (a *App) Shutdown(ctx context.Context) error {
	return a.httpServer.Shutdown(ctx)
}

func (a *App) runSwipeConsumer(uc *usecase.Recommendations) {
	handler := consumers.NewSwipeHandler(uc, a.logger)
	consumer := kafkalib.NewKafkaConsumer(handler, a.logger)
	consumer.StartConsumer(env.KafkaSwipeTopic)
}

func setupLogger() *slog.Logger {
	return slog.New(slog.NewTextHandler(os.Stderr, nil))
}
