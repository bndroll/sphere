package env

import (
	"net/url"
	"os"
)

var (
	KafkaSwipeTopic = Getter("KAFKA_SWIPE_TOPIC", "create.swipe.command")
	TelegramToken   = Getter("TELEGRAM_TOKEN", "")
	AccountURL      = GetterURL("ACCOUNT_URL")
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
