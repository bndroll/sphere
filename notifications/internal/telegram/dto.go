package telegram

import "github.com/google/uuid"

type ProfileResponse struct {
	ID   string  `json:"id"`
	User UserDTO `json:"user,omitempty"`
}

type UserDTO struct {
	TelegramID string `json:"telegramId"`
}

type ProfilesRequest struct {
	Ids []uuid.UUID `json:"ids"`
}
