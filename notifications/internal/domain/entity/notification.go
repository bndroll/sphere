package entity

import (
	"github.com/google/uuid"
	"time"
)

type Notification struct {
	ID          uuid.UUID `gorm:"primaryKey;type:uuid"`
	Text        string
	RecipientID uuid.UUID
	CreatedAt   time.Time
	ImageUrl    string
	Viewed      bool
}

func (n *Notification) TableName() string {
	return "notifications"
}
