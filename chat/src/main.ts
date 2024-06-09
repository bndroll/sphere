import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import process from 'node:process';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as fs from 'node:fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.crt'),
  };
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: true,
      httpsOptions: httpsOptions,
    },
  );
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKER_URL],
      },
      consumer: {
        groupId: process.env.KAFKA_GROUP_ID,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT, '0.0.0.0');
}

bootstrap();
