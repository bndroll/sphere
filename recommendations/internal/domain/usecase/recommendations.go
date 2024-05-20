package usecase

import (
	"bytes"
	"context"
	"encoding/json"
	"github.com/google/uuid"
	"io"
	"log/slog"
	"net/http"
	"net/url"
	"recommendations/internal/domain/entity"
	"time"
)

type Recommendations struct {
	storage    Storage
	logger     *slog.Logger
	client     *http.Client
	accountURL *url.URL
}

type Storage interface {
	GetRecommendationByProfileId(ctx context.Context, profileId uuid.UUID) (*entity.Recommendation, error)
	GetRecommendationsByVector(ctx context.Context, vector float64, filter RecommendationFilter) ([]uuid.UUID, error)
	CreateRecommendation(ctx context.Context, vector entity.Recommendation) error
	CreateReaction(ctx context.Context, reaction entity.Reaction) error
}

func NewRecommendations(storage Storage, accountUrl *url.URL, logger *slog.Logger) *Recommendations {
	return &Recommendations{
		storage:    storage,
		client:     &http.Client{},
		accountURL: accountUrl,
		logger:     logger,
	}
}
func (r *Recommendations) GetRecommendations(ctx context.Context, req GetRecommendationsRequest) (*ProfilesResponse, error) {
	log := r.logger.With(ctx, "Recommendation.GetRecommendations")
	log.Info("Starting GetRecommendations", slog.String("ProfileID", req.ProfileID.String()))

	target, err := r.storage.GetRecommendationByProfileId(ctx, req.ProfileID)
	if err != nil {
		log.Error("Error getting vector by profile ID", err)
		return nil, err
	}

	filter := RecommendationFilter{
		ProfileID: req.ProfileID,
		Category:  req.Category,
		Limit:     req.Limit,
	}
	if req.Category == "Романтическая" {
		switch target.Gender {
		case "male":
			filter.Male = "female"
		case "female":
			filter.Male = "male"
		}
	}
	ids, err := r.storage.GetRecommendationsByVector(ctx, target.Vector, filter)
	if err != nil {
		log.Error("Error getting recommendations by vector", err)
		return nil, err
	}

	resp, err := r.GetProfiles(ctx, ProfilesRequest{ids})
	if err != nil {
		log.Error("Error getting profiles", err)
		return nil, err
	}

	log.Info("Successfully finished GetRecommendations")
	return resp, nil
}

func (r *Recommendations) GetProfiles(ctx context.Context, request ProfilesRequest) (*ProfilesResponse, error) {
	log := r.logger.With(ctx, "Recommendation.GetProfiles")
	log.Info("Starting GetProfiles", slog.Any("request", request))

	data, err := json.Marshal(&request)
	if err != nil {
		log.Error("Error marshalling request", err)
		return nil, err
	}

	buff := bytes.NewBuffer(data)

	req, err := http.NewRequestWithContext(ctx, "POST", r.accountURL.String()+"/profile/find-by-ids", buff)
	if err != nil {
		log.Error("Error creating new HTTP request", err)
		return nil, err
	}

	resp, err := r.client.Do(req)
	if err != nil {
		log.Error("Error executing HTTP request", err)
		return nil, err
	}
	defer resp.Body.Close()

	respData, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Error("Error reading response body", err)
		return nil, err
	}

	var responseDTO []ProfileDTO
	err = json.Unmarshal(respData, &responseDTO)
	if err != nil {
		log.Error("Error unmarshalling response data", err)
		return nil, err
	}

	log.Info("Successfully finished GetProfiles")
	return &ProfilesResponse{responseDTO}, nil
}

func (r *Recommendations) CreateRecommendation(ctx context.Context, action CreateRecommendation) error {
	return r.storage.CreateRecommendation(ctx, entity.Recommendation{
		ID:        uuid.New(),
		Category:  action.Category,
		Gender:    action.Gender,
		ProfileID: uuid.MustParse(action.ID),
		Vector:    action.Embedding,
	})
}

func (r *Recommendations) CreateReaction(ctx context.Context, req CreateReactionRequest) error {
	log := r.logger.With("Recommendation.CreateReaction")
	rec, err := r.storage.GetRecommendationByProfileId(ctx, req.RecProfileID)
	if err != nil {
		log.Error("Error getting recommendation by profile ID", err)
		return err
	}
	if rec == nil {
		return nil
	}

	var nextView *time.Time
	switch req.Type {
	case "like":
		nextView = nil
	case "dislike":
		nts := time.Now().AddDate(0, 0, 30)
		nextView = &nts
	case "skip":
		nts := time.Now().AddDate(0, 0, 10)
		nextView = &nts
	}

	err = r.storage.CreateReaction(ctx, entity.Reaction{
		ID:               uuid.New(),
		ProfileID:        req.ProfileID,
		RecommendationID: rec.ID,
		NextView:         nextView,
	})
	if err != nil {
		log.Error("Error creating reaction", err)
		return err
	}

	return nil
}
