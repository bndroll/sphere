package usecase

import (
	"errors"
	"github.com/google/uuid"
)

type GetListNotifications struct {
	UserID uuid.UUID
	Order
}

func (r GetListNotifications) Validate() error {
	if r.UserID == uuid.Nil {
		return errors.New("userID cannot be nil")
	}

	if r.Offset < 0 {
		return errors.New("offset cannot be negative")
	}

	return nil
}

type NotificationMessage struct {
	Recipient string `json:"recipient"`
	Text      string `json:"text"`
	ImageUrl  string `json:"image_url"`
}

type CreateNotification struct {
	Text      string
	ImageUrl  string
	Recipient uuid.UUID
}

type NotificationList struct {
	Items []NotificationDTO
	Total int64
}

type Order struct {
	Limit  int
	Offset int
}

type NotificationDTO struct {
	Id       uuid.UUID
	Text     string
	ImageUrl string
	Viewed   bool
}

type NotificationListFilter struct {
	UserID uuid.UUID
	Order
}

type ViewedNotification struct {
	Ids []uuid.UUID `json:"ids"`
}
