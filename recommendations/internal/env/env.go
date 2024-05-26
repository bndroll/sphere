package env

import (
	"fmt"
	"net/url"
	"os"
)

var (
	HttpPort                        = fmt.Sprintf(":%s", Getter("HTTP_PORT", "8080"))
	KafkaRecommendationsTopic       = Getter("KAFKA_RECOMMENDATIONS_TOPIC", "")
	KafkaSwipeTopic                 = Getter("KAFKA_SWIPE_TOPIC", "")
	KafkaDeleteRecommendationsTopic = Getter("KAFKA_DELETE_RECOMMENDATIONS_TOPIC", "")
	AccountURL                      = GetterURL("ACCOUNT_URL")
	DataSourceName                  = Getter("DATA_SOURCE_NAME", "")
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
