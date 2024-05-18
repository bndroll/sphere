package app

import (
	"context"
	"gateway/internal/adapters/rest"
	"gateway/internal/env"
	"log/slog"
	"net/http"
	"os"
)

type App struct {
	httpServer *http.Server
}

func (a *App) Run() error {
	log := setupLogger()

	h := rest.New(log)
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

func (a *App) Shutdown(ctx context.Context) error {
	if err := a.httpServer.Shutdown(ctx); err != nil {
		return err
	}
	return nil
}

func setupLogger() *slog.Logger {
	return slog.New(slog.NewTextHandler(os.Stderr, nil))
}
