import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Module } from './s3/s3.module';
import { PostgresConfig } from 'src/config/postgres/postgres.config';
import { RedisConfig } from 'src/config/redis.config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { CoreModule } from 'src/core/core.module';
import { AdapterModule } from 'src/adapter/adapter.module';
import { JwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
      load: [PostgresConfig, RedisConfig, JwtConfig],
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
    S3Module,
    ScheduleModule.forRoot(),
    CoreModule,
    AdapterModule,
  ],
})
export class AppModule {}
