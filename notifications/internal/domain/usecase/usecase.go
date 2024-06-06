package usecase

import (
	"context"
	"github.com/google/uuid"
	"log/slog"
	"net/http"
	"notifications/internal/domain/entity"
	"notifications/internal/service/websockets"
)

type Storage interface {
	GetListNotification(ctx context.Context, filter NotificationListFilter) ([]entity.Notification, error)
	CountNotifications(ctx context.Context, filter NotificationListFilter) (int64, error)
	SaveNotification(ctx context.Context, notification entity.Notification) (uuid.UUID, error)
	DeleteNotification(ctx context.Context, id uuid.UUID) error
	ViewedNotifications(ctx context.Context, ids []uuid.UUID) error
}

type Notifications struct {
	ws      *websockets.Websockets
	logger  *slog.Logger
	storage Storage
}

func NewNotificationsUseCase(logger *slog.Logger, storage Storage, ws *websockets.Websockets) *Notifications {
	return &Notifications{
		logger:  logger,
		storage: storage,
		ws:      ws,
	}
}

func (uc *Notifications) GetListNotifications(ctx context.Context, action GetListNotifications) (*NotificationList, error) {
	log := uc.logger.With("GetListNotifications", action)

	notifications, err := uc.storage.GetListNotification(ctx, NotificationListFilter{
		UserID: action.UserID,
		Order:  action.Order,
	})
	if err != nil {
		log.Error("Error getting list notifications", "error", err)
		return nil, err
	}

	items := uc.NotificationsToNotificationDTOs(notifications)

	total, err := uc.storage.CountNotifications(ctx, NotificationListFilter{
		UserID: action.UserID,
		Order:  action.Order,
	})
	if err != nil {
		log.Error("Error counting notifications", "error", err)
		return nil, err
	}

	return &NotificationList{
		Items: items,
		Total: total,
	}, nil
}

func (uc *Notifications) Notify(message NotificationMessage) {
	log := uc.logger.With("Notify", "message", message)
	ctx := context.Background()

	recipient, err := uuid.Parse(message.Recipient)
	if err != nil {
		log.Error("Error parsing recipient id", "error", err)
	}

	id, err := uc.SaveNotification(ctx, CreateNotification{
		Text:      message.Text,
		ImageUrl:  message.ImageUrl,
		Recipient: recipient,
	})
	if err != nil {
		log.Error("Error saving notifications", "error", err)
	}

	err = uc.BroadcastToUser(message.Recipient, &NotificationDTO{
		Id:   id,
		Text: message.Text,
	})

	if err != nil {
		log.Error("Error saving notifications", "error", err)
	}
}

func (uc *Notifications) SaveNotification(ctx context.Context, action CreateNotification) (uuid.UUID, error) {
	id, err := uc.storage.SaveNotification(ctx, entity.Notification{
		Text:        action.Text,
		RecipientID: action.Recipient,
		ImageUrl:    action.ImageUrl,
		Viewed:      false,
	})

	if err != nil {
		// TODO: wrap error
		return uuid.Nil, err
	}

	return id, nil
}

func (uc *Notifications) NotificationsToNotificationDTOs(notifications []entity.Notification) []NotificationDTO {
	var result []NotificationDTO
	for _, notification := range notifications {
		result = append(result, NotificationDTO{
			Id:       notification.ID,
			Text:     notification.Text,
			ImageUrl: notification.ImageUrl,
			Viewed:   notification.Viewed,
		})
	}

	return result
}

func (uc *Notifications) ViewedNotifications(ctx context.Context, action ViewedNotification) error {
	return uc.storage.ViewedNotifications(ctx, action.Ids)
}

func (uc *Notifications) Subscribe(rw http.ResponseWriter, r *http.Request, userId string) error {
	return uc.ws.Subscribe(rw, r, userId)
}

func (uc *Notifications) BroadcastToUser(userId string, msg interface{}) error {
	return uc.ws.BroadcastToUser(userId, msg)
}

func (uc *Notifications) Broadcast(msg interface{}) error {
	return uc.ws.Broadcast(msg)
}
