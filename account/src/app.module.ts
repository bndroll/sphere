import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Module } from './s3/s3.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { PostgresConfig } from 'src/config/postgres/postgres.config';
import { RedisConfig } from 'src/config/redis.config';
import { ThrottlerConfig } from 'src/config/throttler.config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RequestLoggingInterceptor } from 'src/interceptors/request-logging.interceptor';
import { CoreModule } from 'src/core/core.module';
import { AdapterModule } from 'src/adapter/adapter.module';
import { JwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
      load: [PostgresConfig, RedisConfig, ThrottlerConfig, JwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.getOrThrow('postgres'),
      }),
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.getOrThrow('redis'),
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.getOrThrow('throttler'),
      }),
      inject: [ConfigService],
    }),
    S3Module,
    ScheduleModule.forRoot(),
    CoreModule,
    AdapterModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
