import { Module } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import process from 'node:process';
import { logLevel } from 'kafkajs';

export const KafkaUserProducerProvider = {
  provide: 'KAFKA_USER_PRODUCER',
  useFactory: async (client: ClientKafka) => {
    return client.connect();
  },
  inject: ['ACCOUNT_USER_SERVICE'],
};

export const KafkaProfileProducerProvider = {
  provide: 'KAFKA_PROFILE_PRODUCER',
  useFactory: async (client: ClientKafka) => {
    return client.connect();
  },
  inject: ['ACCOUNT_PROFILE_SERVICE'],
};

export const KafkaChatProducerProvider = {
  provide: 'KAFKA_CHAT_PRODUCER',
  useFactory: async (client: ClientKafka) => {
    return client.connect();
  },
  inject: ['ACCOUNT_CHAT_SERVICE'],
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'ACCOUNT_USER_SERVICE',
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
            groupId: process.env.KAFKA_USER_GROUP_ID,
          },
        },
      },
      {
        name: 'ACCOUNT_PROFILE_SERVICE',
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
            groupId: process.env.KAFKA_PROFILE_GROUP_ID,
          },
        },
      },
      {
        name: 'ACCOUNT_CHAT_SERVICE',
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
            groupId: process.env.KAFKA_CHAT_GROUP_ID,
          },
        },
      },
    ]),
  ],
  providers: [
    KafkaUserProducerProvider,
    KafkaProfileProducerProvider,
    KafkaChatProducerProvider,
  ],
  exports: [
    KafkaUserProducerProvider,
    KafkaProfileProducerProvider,
    KafkaChatProducerProvider,
  ],
})
export class CommonModule {}
