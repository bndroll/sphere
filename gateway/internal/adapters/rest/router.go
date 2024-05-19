package rest

import (
	"gateway/internal/env"
	"github.com/gin-gonic/gin"
	"log/slog"
	"net/http"
)

type Handler struct {
	client *http.Client
	logger *slog.Logger
}

func New(log *slog.Logger) *Handler {
	return &Handler{
		client: &http.Client{},
		logger: log,
	}
}

func (h Handler) Router() *gin.Engine {
	r := gin.New()

	r.Use(gin.Recovery())
	r.Use(gin.Logger())

	r.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{"message": "resource not found"})
	})
	r.NoMethod(func(c *gin.Context) {
		c.JSON(http.StatusMethodNotAllowed, gin.H{"applicationErrorCode": http.StatusText(http.StatusMethodNotAllowed), "message": "method not allowed"})
	})

	service := r.Group("api").Group("gateway")

	service.Handle("GET", "/health/check", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "ok"})
	})

	//ACCOUNT
	account := service.Group("/account")
	account.Any("/auth/*path", h.Redirect("/auth", env.AccountURL))

	return r
}
