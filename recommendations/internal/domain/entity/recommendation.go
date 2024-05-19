package entity

import (
	"github.com/google/uuid"
	"time"
)

type Recommendation struct {
	ID        uuid.UUID `gorm:"primaryKey"`
	ProfileID uuid.UUID `gorm:"not null"`
	Category  string
	Male      string
	Vector    float64 `gorm:"not null"`
}

func (r Recommendation) TableName() string {
	return "recommendations"
}

type Reaction struct {
	ID               uuid.UUID `gorm:"primaryKey"`
	ProfileID        uuid.UUID `gorm:"not null"`
	RecommendationID uuid.UUID `gorm:"not null"`
	Recommendation   Recommendation
	NextView         *time.Time
}

func (r Reaction) TableName() string {
	return "reactions"
}
