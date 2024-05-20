package env

import (
	"net/url"
	"os"
)

var (
	RecSysURL                 = GetterURL("REC_SYS_URL")
	KafkaRecommendationsTopic = Getter("KAFKA_RECOMMENDATIONS_TOPIC", "")
	KafkaProfileTopic         = Getter("KAFKA_PROFILE_TOPIC", "")
)

func Getter(key, defaultValue string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}

	return defaultValue
}

func GetterURL(key string) *url.URL {
	if value, ok := os.LookupEnv(key); ok {
		u, e := url.Parse(value)
		if e != nil {
			panic(e)
		}
		return u
	}

	panic("environment variable '" + key + "' has not been set")
}
