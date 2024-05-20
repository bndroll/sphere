package usecase

import "github.com/google/uuid"

type GetRecommendationsRequest struct {
	ProfileID uuid.UUID `json:"profileId"`
	Category  string    `json:"category"`
	Limit     int
}

type ProfilesResponse struct {
	Items []ProfileDTO `json:"items"`
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
	ProfileID uuid.UUID `json:"profileId"`
	Vector    float64   `json:"vector"`
	Category  string    `json:"category"`
	Male      string    `json:"male"`
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
