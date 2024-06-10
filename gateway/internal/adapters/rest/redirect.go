package rest

import (
	"github.com/gin-gonic/gin"
	"io"
	"net/http"
	"net/url"
	"strings"
)

func (h Handler) Redirect(prefixPath string, url *url.URL) func(*gin.Context) {
	return func(c *gin.Context) {
		proxyPath := prefixPath + c.Param("path")

		targetURL := *url
		targetURL.Path = strings.TrimRight(targetURL.Path, "/") + "/" + strings.TrimLeft(proxyPath, "/")
		targetURL.RawQuery = c.Request.URL.RawQuery

		req, err := http.NewRequest(c.Request.Method, targetURL.String(), c.Request.Body)
		if err != nil {
			h.logger.Error("Error create new request", "error", err, "url", targetURL)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create request"})
			return
		}

		for key, values := range c.Request.Header {
			for _, value := range values {
				req.Header.Add(key, value)
			}
		}

		resp, err := h.client.Do(req)
		if err != nil {
			h.logger.Error("Error do request", "error", err, "req", req, "resp", resp)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to forward request"})
			return
		}
		defer resp.Body.Close()

		for key, values := range resp.Header {
			for _, value := range values {
				c.Header(key, value)
			}
		}
		c.Status(resp.StatusCode)

		body, err := io.ReadAll(resp.Body)
		if err != nil {
			h.logger.Error("Error read resp body", "error", err, "req", req, "resp", resp)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to read response body"})
			return
		}
		c.Writer.Write(body)
	}
}
