package consumers

import (
	"encoding/json"
	"github.com/IBM/sarama"
	"log/slog"
	"notifications/internal/domain/usecase"
)

type Massage struct {
	Recipient string `json:"recipient"`
	Text      string `json:"text"`
	ImageUrl  string `json:"image_url"`
}

// Consumer represents a Sarama consumer group consumer
type Consumer struct {
	ready  chan bool
	logger *slog.Logger
	uc     *usecase.Notifications
}

func NewNotificationsConsumer(
	logger *slog.Logger,
	uc *usecase.Notifications,
	ready chan bool) *Consumer {
	return &Consumer{
		logger: logger,
		uc:     uc,
		ready:  ready,
	}
}

func (c *Consumer) Setup(sarama.ConsumerGroupSession) error {
	close(c.ready)
	return nil
}

func (c *Consumer) Cleanup(sarama.ConsumerGroupSession) error {
	return nil
}

func (c *Consumer) ConsumeClaim(session sarama.ConsumerGroupSession, claim sarama.ConsumerGroupClaim) error {
	log := c.logger.With("ConsumeNotifications")
	for {
		select {
		case message, ok := <-claim.Messages():
			if !ok {
				log.Info("message channel was closed")
				return nil
			}

			var m usecase.NotificationMessage
			err := json.Unmarshal(message.Value, &m)
			if err != nil {
				log.Error("Error unmarshalling notification message", "error", err, "message", message.Value)
				continue
			}

			go c.uc.Notify(m)

			session.MarkMessage(message, "")
		case <-session.Context().Done():
			return nil
		}
	}
}
