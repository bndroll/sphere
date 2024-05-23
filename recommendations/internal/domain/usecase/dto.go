package usecase

import "github.com/google/uuid"

type GetRecommendationsRequest struct {
	ProfileID uuid.UUID `json:"profileId"`
	Category  string    `json:"category"`
	Limit     int       `json:"limit"`
}

type ProfileDTO struct {
	ID       uuid.UUID `json:"id"`
	Type     string    `json:"type"`
	Info     any       `json:"info"`
	Visible  string    `json:"visible"`
	User     any       `json:"user"`
	Category any       `json:"category"`
	Tags     any       `json:"tags"`
}

type ProfilesRequest struct {
	Ids []uuid.UUID `json:"ids"`
}

type CreateRecommendation struct {
	ID        string  `json:"id"`
	Embedding float64 `json:"embedding"`
	Gender    string  `json:"gender,omitempty"`
	Category  string  `json:"category"`
	Type      string  `json:"type"`
}

type CreateReactionRequest struct {
	ProfileID    uuid.UUID `json:"profileId"`
	RecProfileID uuid.UUID `json:"recProfileId"`
	Type         string    `json:"type"`
}

type ProduceReactionRequest struct {
	ID           uuid.UUID `json:"id"`
	RecProfileID uuid.UUID `json:"recProfileId"`
	Type         string    `json:"type"`
}

type RecommendationFilter struct {
	Male      string
	Category  string
	ProfileID uuid.UUID
	Limit     int
}
