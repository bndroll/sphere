package app

import (
	"context"
	"crypto/tls"
	"fmt"
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
	cert, err := tls.LoadX509KeyPair("server.crt", "server.key")
	if err != nil {
		return fmt.Errorf("failed to load X509 key pair: %v", err)
	}
	config := tls.Config{
		Certificates: []tls.Certificate{cert},
	}

	log := setupLogger()

	h := rest.New(log)
	router := h.Router()

	a.httpServer = &http.Server{
		Addr:      env.HttpPort,
		Handler:   router,
		TLSConfig: &config,
	}

	if err := a.httpServer.ListenAndServeTLS("", ""); err != nil {
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
