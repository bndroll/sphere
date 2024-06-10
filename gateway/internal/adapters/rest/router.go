package rest

import (
	"crypto/tls"
	"gateway/internal/env"
	"gateway/internal/kafkalib"
	"github.com/gin-gonic/gin"
	"log/slog"
	"net"
	"net/http"
	"net/http/httputil"
	"net/url"
	"time"
)

type Handler struct {
	client   *http.Client
	logger   *slog.Logger
	producer *kafkalib.Producer
}

func New(producer *kafkalib.Producer, log *slog.Logger) *Handler {
	return &Handler{
		client: &http.Client{
			Transport: &http.Transport{
				TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
			},
		},
		logger:   log,
		producer: producer,
	}
}

func (h Handler) Router() *gin.Engine {
	r := gin.New()

	r.Use(gin.Recovery())
	r.Use(gin.Logger())
	r.Use(CORSMiddleware())

	service := r.Group("api").Group("gateway")

	service.Handle("GET", "/health/check", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "ok"})
	})

	//REACTIONS
	reactions := service.Group("/reactions")
	reactions.POST("/create", h.SwipeReaction)
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
	chat.Any("/*path", h.Redirect("/chat", env.ChatURL))

	//WSS
	service.GET("/wss", h.WSS)

	return r
}

func (h Handler) WSS(c *gin.Context) {

	wssUrl, err := url.ParseRequestURI(env.ChatWssURL)
	if err != nil {
		h.logger.Error("error parse chat wss url")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "error parse chat wss url"})
		return
	}

	director := func(req *http.Request) {
		req.URL = wssUrl
	}
	dialer := &net.Dialer{
		KeepAlive: 30 * time.Second,
	}
	proxy := &httputil.ReverseProxy{Director: director, Transport: &http.Transport{
		Proxy:               http.ProxyFromEnvironment,
		DialContext:         dialer.DialContext,
		TLSHandshakeTimeout: 10 * time.Second,
		TLSClientConfig:     &tls.Config{InsecureSkipVerify: true},
	}}
	proxy.ServeHTTP(c.Writer, c.Request)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "*")

		if c.Request.Method == "OPTIONS" && c.Request.RequestURI == "/api/gateway/reactions/create" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
