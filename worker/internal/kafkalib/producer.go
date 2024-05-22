package kafkalib

import (
	"encoding/json"
	"github.com/confluentinc/confluent-kafka-go/kafka"
	"log/slog"
)

type Producer struct {
	KafkaConnector KafkaConnector
	Logger         *slog.Logger
}

func NewProducer(logger *slog.Logger) *Producer {
	return &Producer{
		KafkaConnector: *NewKafkaConnector(logger),
		Logger:         logger,
	}
}

func (k *Producer) CreateProducer() *kafka.Producer {
	p, err := kafka.NewProducer(k.KafkaConnector.GetConfigMap(false))
	if err != nil {
		k.Logger.Error("Kafka Producer: Failed to create producer: %s", err)
		panic(err)
	}
	k.Logger.Debug("Kafka Producer: Created Producer %s", p)
	return p
}

func (k *Producer) SendMessage(topic string, value interface{}) error {
	message, err := json.Marshal(&value)
	if err != nil {
		k.Logger.Error("Kafka Producer: send message error: %s", err)
		return err
	}

	return k.SendRawMessage(topic, message, []kafka.Header{})
}

func (k *Producer) SendRawMessage(topic string, message []byte, headers []kafka.Header) error {
	p := k.CreateProducer()
	deliveryChan := make(chan kafka.Event)
	defer close(deliveryChan)
	defer p.Close()

	err := p.Produce(&kafka.Message{
		TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny},
		Value:          message,
		Headers:        headers,
	}, deliveryChan)

	if err != nil {
		k.Logger.Error("Kafka Producer: send message error: %s", err)
		return err
	}
	e := <-deliveryChan
	m := e.(*kafka.Message)

	if m.TopicPartition.Error != nil {
		k.Logger.Error("Kafka Producer: Delivery failed: %s", m.TopicPartition.Error)
		return m.TopicPartition.Error
	}

	return nil
}

func (k *Producer) SendRawMsg(topic string, key []byte, partition int32, message []byte, headers []kafka.Header) error {
	p := k.CreateProducer()
	deliveryChan := make(chan kafka.Event)
	defer close(deliveryChan)
	defer p.Close()

	err := p.Produce(&kafka.Message{
		TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: partition},
		Key:            key,
		Value:          message,
		Headers:        headers,
	}, deliveryChan)
	if err != nil {
		k.Logger.Error("Kafka Producer: send message error: %s", err)
		return err
	}
	e := <-deliveryChan
	m := e.(*kafka.Message)

	if m.TopicPartition.Error != nil {
		k.Logger.Error("Kafka Producer: Delivery failed: %s", m.TopicPartition.Error)
		return m.TopicPartition.Error
	}
	return nil
}
