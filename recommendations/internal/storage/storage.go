package storage

import (
	"context"
	"errors"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"recommendations/internal/domain/entity"
	"recommendations/internal/domain/usecase"
	"time"
)

type Storage struct {
	db *gorm.DB
}

func New(db *gorm.DB) *Storage {
	return &Storage{db: db}
}

func (s *Storage) GetRecommendationByProfileId(ctx context.Context, profileId uuid.UUID) (*entity.Recommendation, error) {
	var res entity.Recommendation

	err := s.db.WithContext(ctx).Model(&entity.Recommendation{}).Where("profile_id = ?", profileId.String()).Take(&res).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}

	return &res, nil
}

func (s *Storage) GetRecommendationsByVector(ctx context.Context, vector float64, filter usecase.RecommendationFilter) ([]uuid.UUID, error) {
	var res []uuid.UUID

	db := s.db.WithContext(ctx).Model(&entity.Recommendation{}).Select("recommendations.id")
	if filter.Male != "" {
		db = db.Where("male = ?", filter.Male)
	}
	if filter.Category != "" {
		db = db.Where("category = ?", filter.Category)
	}

	if filter.ProfileID != uuid.Nil {
		db = db.
			Where("recommendations.profile_id != ?", filter.ProfileID).
			Joins("LEFT JOIN reactions ON reactions.recommendation_id = recommendations.id").
			Where("reactions.id IS NULL OR (next_view is NOT NULL AND next_view < ?)", time.Now())
	}

	err := db.Limit(filter.Limit).Find(&res).Error
	if err != nil {
		return nil, err
	}

	return res, nil
}

func (s *Storage) CreateRecommendation(ctx context.Context, entity entity.Recommendation) error {
	return s.db.WithContext(ctx).Create(&entity).Error
}

func (s *Storage) CreateReaction(ctx context.Context, entity entity.Reaction) error {
	return s.db.WithContext(ctx).Create(&entity).Error
}