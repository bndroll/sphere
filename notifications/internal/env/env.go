package env

import (
	"fmt"
	"os"
)

var (
	HttpPort     = fmt.Sprintf(":%s", Getter("HTTP_PORT", "8080"))
	KafkaBrokers = Getter("KAFKA_BROKERS", "")
	KafkaGroupID = Getter("KAFKA_GROUP_ID", "")
	KafkaTopics  = Getter("KAFKA_TOPICS", "")

	DataSourceName = Getter("DATA_SOURCE_NAME", "")
)

func Getter(key, defaultValue string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}

	return defaultValue
}
