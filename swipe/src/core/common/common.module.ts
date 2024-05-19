import { Module } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import process from 'node:process';
import { logLevel } from '@nestjs/microservices/external/kafka.interface';

export const KafkaSwipeDWHProducerProvider = {
  provide: 'KAFKA_SWIPE_DWH_PRODUCER',
  useFactory: async (client: ClientKafka) => {
    return client.connect();
  },
  inject: ['SWIPE_SWIPE_SERVICE'],
};

export const KafkaSwipeChatProducerProvider = {
  provide: 'KAFKA_SWIPE_CHAT_PRODUCER',
  useFactory: async (client: ClientKafka) => {
    return client.connect();
  },
  inject: ['SWIPE_CHAT_SERVICE'],
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'SWIPE_SWIPE_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: process.env.KAFKA_CLIENT_ID,
            brokers: [process.env.KAFKA_BROKER_URL],
            logLevel:
              process.env.MODE === 'development'
                ? logLevel.INFO
                : logLevel.ERROR,
          },
          consumer: {
            groupId: process.env.KAFKA_SWIPE_DWH_GROUP_ID,
          },
        },
      },
      {
        name: 'SWIPE_CHAT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: process.env.KAFKA_CLIENT_ID,
            brokers: [process.env.KAFKA_BROKER_URL],
            logLevel:
              process.env.MODE === 'development'
                ? logLevel.INFO
                : logLevel.ERROR,
          },
          consumer: {
            groupId: process.env.KAFKA_SWIPE_CHAT_GROUP_ID,
          },
        },
      },
    ]),
  ],
  providers: [KafkaSwipeDWHProducerProvider, KafkaSwipeChatProducerProvider],
  exports: [KafkaSwipeDWHProducerProvider, KafkaSwipeChatProducerProvider],
})
export class CommonModule {}
