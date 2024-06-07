package telegram

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	api "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"github.com/google/uuid"
	"io"
	"log/slog"
	"net/http"
	"notifications/internal/env"
	"strconv"
)

type CreateReactionRequest struct {
	ProfileID    uuid.UUID `json:"profileId"`
	RecProfileID uuid.UUID `json:"recProfileId"`
	Type         string    `json:"type"`
}

type Service struct {
	bot    *api.BotAPI
	logger *slog.Logger
	client *http.Client
}

func NewService(token string, logger *slog.Logger) *Service {
	bot, err := api.NewBotAPI(token)
	if err != nil {
		panic(err)
	}
	bot.Debug = true

	return &Service{
		bot:    bot,
		logger: logger,
		client: &http.Client{},
	}
}

func (s *Service) Notify(request CreateReactionRequest) {
	if request.Type != "like" {
		return
	}
	tgID, err := s.getTelegramID(request.RecProfileID)
	if err != nil {
		s.logger.Error("failed to get telegram id", "error", err)
	}

	msg := api.NewMessage(tgID, "Привет! Кажется мы получили реакцию на вашу анкету зайдите проверьте, вдруг там что-то важное")

	_, err = s.bot.Send(msg)
	if err != nil {
		s.logger.Error("failed to send message", "error", err)
	}
}

func (s *Service) getTelegramID(profileID uuid.UUID) (int64, error) {
	ctx := context.Background()

	data, err := json.Marshal(&ProfilesRequest{Ids: []uuid.UUID{profileID}})
	if err != nil {
		return 0, err
	}

	buff := bytes.NewBuffer(data)

	req, err := http.NewRequestWithContext(ctx, "POST", env.AccountURL.String()+"/profile/find-by-ids", buff)
	if err != nil {
		return 0, err
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := s.client.Do(req)
	if err != nil {
		return 0, err
	}
	defer resp.Body.Close()

	respData, err := io.ReadAll(resp.Body)
	if err != nil {
		return 0, err
	}

	var profiles []ProfileResponse
	err = json.Unmarshal(respData, &profiles)
	if err != nil {
		return 0, err
	}

	if len(profiles) == 0 {
		return 0, errors.New("no profile found")
	}

	tgIdStr := profiles[0].User.TelegramID

	tgId, err := strconv.Atoi(tgIdStr)

	return int64(tgId), err
}
