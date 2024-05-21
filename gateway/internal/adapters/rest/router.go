package rest

import (
	"gateway/internal/env"
	"gateway/internal/kafkalib"
	"github.com/gin-gonic/gin"
	"log/slog"
	"net/http"
)

type Handler struct {
	client   *http.Client
	logger   *slog.Logger
	producer *kafkalib.Producer
}

func New(producer *kafkalib.Producer, log *slog.Logger) *Handler {
	return &Handler{
		client:   &http.Client{},
		logger:   log,
		producer: producer,
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
	account.Any("/*path", h.Redirect("/auth", env.AccountURL))

	//RECOMMENDATIONS
	recommendations := service.Group("/recommendations")
	recommendations.Any("/*path", h.AuthMiddleware(), h.Redirect("/api/v1/recommendations", env.RecommendationsURL))

	//SWIPE
	swipe := service.Group("/swipe")
	service.POST("/reaction", h.SwipeReaction)
	swipe.Any("/*path", h.AuthMiddleware(), h.Redirect("/swipe", env.SwipeURL))

	return r
}
