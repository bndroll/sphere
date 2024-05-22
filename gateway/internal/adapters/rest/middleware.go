package rest

import (
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"net/http"
	"os"
	"strings"
)

func (h Handler) AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")

		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is required"})
			c.Abort()
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header format must be Bearer {token}"})
			c.Abort()
			return
		}

		token := parts[1]

		ok, err := h.validateToken(c, token)
		if err != nil {
			h.logger.Error("Failed to validate token", "error", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "INTERNAL_ERROR"})
			c.Abort()
			return
		}

		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		c.Next()
	}
}

func (h Handler) UserIDMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")

		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is required"})
			c.Abort()
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header format must be Bearer {token}"})
			c.Abort()
			return
		}

		token := parts[1]

		ok, err := h.validateToken(c, token)
		if err != nil {
			h.logger.Error("Failed to validate token", "error", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "INTERNAL_ERROR"})
			c.Abort()
			return
		}

		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		userID, err := h.extractUserIDFromToken(token)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		c.Request.Header.Set("X-User-ID", userID)

		c.Next()
	}
}

func (h Handler) extractUserIDFromToken(tokenString string) (string, error) {
	parser := jwt.Parser{SkipClaimsValidation: true}
	token, _, err := parser.ParseUnverified(tokenString, jwt.MapClaims{})
	if err != nil {
		return "", err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		userID, ok := claims["id"].(string)
		if !ok {
			return "", fmt.Errorf("user_id not found in token claims")
		}
		return userID, nil
	}

	return "", fmt.Errorf("invalid token")
}

func (h Handler) validateToken(c context.Context, token string) (bool, error) {
	accountURL := os.Getenv("ACCOUNT_URL")
	client := &http.Client{}

	req, err := http.NewRequestWithContext(c, "GET", accountURL+"/auth/verify-token", nil)
	if err != nil {
		return false, err
	}

	req.Header.Set("Authorization", "Bearer "+token)
	resp, err := client.Do(req)
	if err != nil {
		return false, err
	}
	defer resp.Body.Close()

	return resp.StatusCode == http.StatusOK, nil
}
