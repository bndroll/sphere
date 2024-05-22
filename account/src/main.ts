import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fmp from '@fastify/multipart';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: true,
    },
  );
  app.connectMicroservice<MicroserviceOptions>({});
  app.useGlobalPipes(new ValidationPipe());

  await app.register(fmp, {
    limits: { fileSize: 1000000000 },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT, '0.0.0.0');
}

bootstrap();
