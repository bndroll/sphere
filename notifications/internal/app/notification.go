package app

import (
	"context"
	"log/slog"
	"net/http"
	"notifications/internal/domain/usecase"
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

	uc := usecase.NewNotificationsUseCase(l, st, ws)

	err = <-a.err
	return err
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
