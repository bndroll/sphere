package kafkalib

import (
	"log/slog"
	"os"
	"os/signal"
	"strings"
	"syscall"

	"github.com/confluentinc/confluent-kafka-go/kafka"
)

type Message interface {
	Handle(msg kafka.Message)
}

type Consumer struct {
	Message        Message
	KafkaConnector KafkaConnector
	Logger         *slog.Logger
}

func NewKafkaConsumer(message Message, logger *slog.Logger) *Consumer {
	return &Consumer{
		message,
		*NewKafkaConnector(logger),
		logger,
	}
}

func (k *Consumer) StartConsumer(topics ...string) {
	sigchan := make(chan os.Signal, 1)
	signal.Notify(sigchan, syscall.SIGINT, syscall.SIGTERM)
	c, err := kafka.NewConsumer(k.KafkaConnector.GetConfigMap(true))
	if err != nil {
		k.Logger.Error("failed to start consumer: %s", err)
		panic(err)
	}
	k.Logger.Info("Created Consumer")
	if len(topics) == 0 {
		k.Logger.Error("failed to start consumer: can't get KAFKA_TOPIC param")
		panic(nil)
	}

	var rebalanceCb func(c *kafka.Consumer, e kafka.Event) error
	rebalanceCb = func(c *kafka.Consumer, e kafka.Event) error {
		k.Logger.Info("Got kafka partition rebalance event %s in %s consumer", e.String(), c.String())
		switch e.(type) {
		case kafka.RevokedPartitions:
			// Resubscribe to the topic to get new partitions assigned.
			err := c.SubscribeTopics(topics, rebalanceCb)
			if err != nil {
				return err
			}
		}
		return nil
	}

	err = c.SubscribeTopics(topics, rebalanceCb)
	if err != nil {
		k.Logger.Error("failed to subscribe topic: %s", err)
		panic(err)
	}
	run := true
	timeoutMs := k.KafkaConnector.GetPollTimeoutMs()
	errorsExitCntBase := k.KafkaConnector.GetMaxErrorsExitCount()
	errorsExitCnt := errorsExitCntBase

	for run == true {
		select {
		case sig := <-sigchan:
			k.Logger.Info("Caught signal %s: terminating", sig)
			run = false
		default:
			ev := c.Poll(timeoutMs)
			if ev == nil {
				continue
			}
			switch e := ev.(type) {
			case *kafka.Message:
				errorsExitCnt = errorsExitCntBase
				k.Logger.Debug("Message on topic %s, partition: %s: %s", strings.Join(topics, ", "), e.TopicPartition, string(e.Value))
				if e.Headers != nil {
					k.Logger.Debug("Headers: %+v", e.Headers)
				}
				k.Message.Handle(*e)
			case kafka.Error:
				if e.Code() == kafka.ErrAllBrokersDown {
					run = false
				} else if errorsExitCntBase > 0 {
					errorsExitCnt--
					if errorsExitCnt == 0 {
						run = false
					}
				}
				if !run {
					k.Logger.Error("Stop consuming with error: %+v", e)
				} else {
					k.Logger.Error("Continue consuming with error: %+v", e)
				}
			default:
				k.Logger.Error("Ignored %+v", e)
			}
		}
	}

	k.Logger.Info("Closing consumer %v", c)
	_ = c.Close()
}

func (k *Consumer) CheckConsumer() (int, error) {
	c, err := kafka.NewConsumer(k.KafkaConnector.GetConfigMap(true))
	if err != nil {
		k.Logger.Error("failed to start consumer: %v", err)
		return 0, err
	}
	metadata, err := c.GetMetadata(nil, true, 500)
	topicLen := 0
	if err != nil {
		k.Logger.Error("failed to subscribe topic: %v", err)
	} else {
		topicLen = len(metadata.Topics)
	}

	c.Close()
	return topicLen, err
}
