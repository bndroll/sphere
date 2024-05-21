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
		w.ProcessProfileIfOpen(ctx, dto)
	}
}

func (w *Worker) ProcessProfile(ctx context.Context, dto *ProfileDTO) {
	log := w.logger.With("Worker.ProcessProfile", "profileID", dto.ID)

	msg, err := w.embedding(ctx, dto)
	if err != nil {
		log.Error("Failed to embed message", "error", err)
	}

	err = w.producer.SendMessage(w.recommendationTopic, msg)
	if err != nil {
		log.Error("Failed to send recommendation", "error", err)
	}
}

func (w *Worker) embedding(ctx context.Context, dto *ProfileDTO) (*ResponseRecommendation, error) {
	client := http.Client{}

	sentence := w.getSentence(dto)

	buff := &bytes.Buffer{}
	buff.WriteString(fmt.Sprintf("{\"id\":%s, \"sentence\":%s", dto.ID, sentence))

	req, err := http.NewRequestWithContext(ctx, "POST", w.recSysURL.String()+"/embeddings", buff)

	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var responseRec ResponseRecommendation
	err = json.Unmarshal(data, &responseRec)
	if err != nil {
		return nil, err
	}

	if dto.User != nil {
		responseRec.Gender = dto.User.Gender
	}
	responseRec.Category = dto.Category.Title
	responseRec.Type = dto.Type

	return &responseRec, nil
}

func (w *Worker) getSentence(dto *ProfileDTO) string {
	res := fmt.Sprintf("%s", dto.Info.City)

	for _, tag := range dto.Tags {
		res = fmt.Sprintf("%s %s", res, tag)
	}

	return res
}
