package usecase

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"net/url"
	"worker/internal/kafkalib"
)

type Worker struct {
	recSysURL           *url.URL
	logger              *slog.Logger
	producer            *kafkalib.Producer
	recommendationTopic string
}

func NewWorker(recSysURL *url.URL, logger *slog.Logger, producer *kafkalib.Producer, recommendationTopic string) *Worker {
	return &Worker{
		recSysURL:           recSysURL,
		logger:              logger,
		producer:            producer,
		recommendationTopic: recommendationTopic,
	}
}

func (w *Worker) ProcessProfileIfOpen(ctx context.Context, dto *ProfileDTO) {
	if dto.Visible != "Close" {
		w.ProcessProfile(ctx, dto)
	}
}

func (w *Worker) ProcessProfile(ctx context.Context, dto *ProfileDTO) {
	log := w.logger.With("Worker.ProcessProfile", "profileID", dto.ID)

	msg, err := w.embedding(ctx, dto)
	if err != nil {
		log.Error("Failed to embed message", "error", err)
		return
	}

	err = w.producer.SendMessage(w.recommendationTopic, msg)
	if err != nil {
		log.Error("Failed to send recommendation", "error", err)
	}
}

func (w *Worker) embedding(ctx context.Context, dto *ProfileDTO) (*ResponseRecommendation, error) {
	w.logger.With("Worker.embedding")

	client := http.Client{}
	sentence := w.getSentence(dto)
	reqData, err := json.Marshal(&EmbeddingRequest{
		ID:       dto.ID,
		Sentence: sentence,
	})
	buff := bytes.NewBuffer(reqData)

	req, err := http.NewRequestWithContext(ctx, "POST", w.recSysURL.String()+"/embeddings", buff)
	if err != nil {
		return nil, err
	}
	req.Header.Add("Content-Type", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var eResp EmbeddingResponse
	err = json.Unmarshal(data, &eResp)
	if err != nil {
		return nil, err
	}

	var recResp ResponseRecommendation
	if dto.User != nil && dto.User.Gender != "" {
		recResp.Gender = dto.User.Gender
	} else if dto.Info.Dating != nil {
		recResp.Gender = dto.Info.Dating.Gender
	}
	recResp.ID = dto.ID
	recResp.Embedding = eResp.Embedding
	recResp.Category = dto.Category.Title
	recResp.Type = dto.Type

	return &recResp, nil
}

func (w *Worker) getSentence(dto *ProfileDTO) string {
	res := fmt.Sprintf("%s", dto.Info.City)

	for _, tag := range dto.Tags {
		res = fmt.Sprintf("%s %s", res, tag.Title)
	}

	return res
}
