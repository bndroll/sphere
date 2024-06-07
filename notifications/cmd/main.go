package main

import (
	"log"
	"notifications/internal/app"
)

func main() {
	a := app.App{}
	if err := a.Run(); err != nil {
		log.Fatal(err)
	}
}
