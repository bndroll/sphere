import { Module } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

export const KafkaProducerProvider = {
  provide: 'KAFKA_PRODUCER',
  useFactory: async (client: ClientKafka) => {
    return client.connect();
  },
  inject: ['SWIPE_SERVICE'],
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'SWIPE_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: process.env.KAFKA_CLIENT_ID,
            brokers: [process.env.KAFKA_BROKER_URL],
          },
        },
      },
    ]),
  ],
  providers: [KafkaProducerProvider],
  exports: [KafkaProducerProvider],
})
export class CommonModule {}
