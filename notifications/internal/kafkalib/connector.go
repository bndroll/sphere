package kafkalib

import (
	"github.com/confluentinc/confluent-kafka-go/kafka"
	"log/slog"
	"os"
	"strconv"
)

type KafkaConnector struct {
	Logger *slog.Logger
}

func NewKafkaConnector(logger *slog.Logger) *KafkaConnector {
	return &KafkaConnector{
		Logger: logger,
	}
}

func (k KafkaConnector) GetConfigMap(forConsumer bool) *kafka.ConfigMap {
	configMap := k.getBaseMap()
	k.setSecurityConfigs(configMap)
	if forConsumer {
		k.setConsumerConfigs(configMap)
	}

	return configMap
}

func (k KafkaConnector) getBaseMap() *kafka.ConfigMap {
	KafkaUrl, ok := os.LookupEnv("KAFKA_URL")
	if !ok {
		k.Logger.Error("failed to connect kafka: can't get KAFKA_URL param")
	}
	KafkaMaxMessageSize := 1048576
	EnvKafkaMaxMessageSize, ok := os.LookupEnv("KAFKA_MESSAGE_MAX_BYTES")
	if ok {
		parseSize, err := strconv.Atoi(EnvKafkaMaxMessageSize)
		if err == nil {
			KafkaMaxMessageSize = parseSize
		}
	}

	return &kafka.ConfigMap{
		"metadata.broker.list": KafkaUrl,
		"message.max.bytes":    KafkaMaxMessageSize,
	}
}

func (k KafkaConnector) setSecurityConfigs(configMap *kafka.ConfigMap) {
	KafkaUsername, _ := os.LookupEnv("KAFKA_USER_NAME")
	KafkaPassword, _ := os.LookupEnv("KAFKA_PASSWORD")
	if KafkaUsername != "" || KafkaPassword != "" {
		if KafkaUsername == "" {
			k.Logger.Error("failed to connect kafka: can't get KAFKA_USER_NAME param")
		}
		if KafkaPassword == "" {
			k.Logger.Error("failed to connect kafka: can't get KAFKA_PASSWORD param")
		}
		KafkaSecurityProtocol, ok := os.LookupEnv("KAFKA_SECURITY_PROTOCOL")
		if !ok {
			k.Logger.Error("failed to connect kafka: can't get KAFKA_SECURITY_PROTOCOL param")
		}
		KafkaSaslMechanism, ok := os.LookupEnv("KAFKA_SASL_MECHANISM")
		if !ok {
			k.Logger.Error("failed to connect kafka: can't get KAFKA_SASL_MECHANISM param")
		}
		_ = configMap.SetKey("security.protocol", KafkaSecurityProtocol)
		_ = configMap.SetKey("sasl.username", KafkaUsername)
		_ = configMap.SetKey("sasl.password", KafkaPassword)
		_ = configMap.SetKey("sasl.mechanism", KafkaSaslMechanism)
	}
}

func (k KafkaConnector) setConsumerConfigs(configMap *kafka.ConfigMap) {
	KafkaGroupId, ok := os.LookupEnv("KAFKA_GROUP_ID")
	if !ok {
		k.Logger.Error("failed to connect kafka: can't get KAFKA_GROUP_ID param")
	}
	_ = configMap.SetKey("group.id", KafkaGroupId)

	KafkaAutoOffsetReset := "earliest"
	EnvKafkaAutoOffsetReset, ok := os.LookupEnv("KAFKA_AUTO_OFFSET_RESET")
	if ok {
		KafkaAutoOffsetReset = EnvKafkaAutoOffsetReset
	}
	_ = configMap.SetKey("auto.offset.reset", KafkaAutoOffsetReset)

	KafkaMaxPollIntervalMs := 6000000
	EnvKafkaMaxPollIntervalMs, ok := os.LookupEnv("KAFKA_MAX_POLL_INTERVAL_MS")
	if ok {
		parseSize, err := strconv.Atoi(EnvKafkaMaxPollIntervalMs)
		if err == nil {
			KafkaMaxPollIntervalMs = parseSize
		}
	}
	_ = configMap.SetKey("max.poll.interval.ms", KafkaMaxPollIntervalMs)
}

func (k KafkaConnector) GetPollTimeoutMs() int {
	timeoutMs := 100
	EnvTimeoutMs, ok := os.LookupEnv("KAFKA_POLL_TIMEOUT_MS")
	if ok {
		parseTimeoutMs, err := strconv.Atoi(EnvTimeoutMs)
		if err == nil {
			timeoutMs = parseTimeoutMs
		}
	}

	return timeoutMs
}

func (k KafkaConnector) GetMaxErrorsExitCount() int {
	errorsExitCount := 0
	EnvTimeoutMs, ok := os.LookupEnv("KAFKA_MAX_ERRORS_EXIT_COUNT")
	if ok {
		parseErrorsCount, err := strconv.Atoi(EnvTimeoutMs)
		if err == nil {
			errorsExitCount = parseErrorsCount
		}
	}

	return errorsExitCount
}
