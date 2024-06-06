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

	r.Use(CORSMiddleware())
	r.Use(gin.Recovery())
	r.Use(gin.Logger())

	r.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{"message": "resource not found"})
	})
	r.NoMethod(func(c *gin.Context) {
		c.JSON(http.StatusMethodNotAllowed, gin.H{"applicationErrorCode": http.StatusText(http.StatusMethodNotAllowed), "message": "method not allowed"})
	})

	service := r.Group("api").Group("gateway")
	service.POST("/reactions", h.SwipeReaction)

	service.Handle("GET", "/health/check", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "ok"})
	})

	//ACCOUNT
	account := service.Group("/account")
	account.Any("/*path", h.Redirect("", env.AccountURL))

	//RECOMMENDATIONS
	recommendations := service.Group("/recommendations")
	recommendations.Any("/*path", h.Redirect("/api/v1/recommendations", env.RecommendationsURL))

	//SWIPE
	swipe := service.Group("/swipe")
	swipe.Any("/*path", h.Redirect("/swipe", env.SwipeURL))

	//CHAT
	chat := service.Group("/chat")
	chat.Any("/*path", h.Redirect("chat", env.ChatURL))

	return r
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "*")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
