package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"recommendations/internal/app"
	"syscall"
	"time"
)

func main() {
	ctx := context.Background()
	a := app.App{}
	go func() {
		if err := a.Run(); err != nil {
			log.Fatal(err)
		}
	}()

	sign := make(chan os.Signal, 1)
	signal.Notify(sign, syscall.SIGINT, syscall.SIGTERM)

	<-sign

	ctxWithTimeout, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()
	if err := a.Shutdown(ctxWithTimeout); err != nil {
		log.Fatal(err)
	}
}
