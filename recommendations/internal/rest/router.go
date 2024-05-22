package rest

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"log/slog"
	"net/http"
	"recommendations/internal/domain/usecase"
)

type Handler struct {
	uc     *usecase.Recommendations
	logger *slog.Logger
}

func New(uc *usecase.Recommendations,
	logger *slog.Logger) *Handler {
	return &Handler{
		uc:     uc,
		logger: logger,
	}
}

func (h *Handler) Router() *gin.Engine {
	r := gin.New()

	r.Use(cors.New(cors.Config{
		AllowOriginFunc: func(origin string) bool {
			return true
		},
	}))
	r.Use(gin.Recovery())
	r.Use(gin.Logger())

	r.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{"message": "resource not found"})
	})
	r.NoMethod(func(c *gin.Context) {
		c.JSON(http.StatusMethodNotAllowed, gin.H{"applicationErrorCode": http.StatusText(http.StatusMethodNotAllowed), "message": "method not allowed"})
	})

	service := r.Group("api").Group("v1").Group("recommendations")

	service.Handle("GET", "/health/check", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "ok"})
	})

	service.GET("/list", h.ListRecommendations)

	return r
}
