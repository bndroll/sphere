import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresConfig } from 'src/config/postgres/postgres.config';
import { RedisConfig } from 'src/config/redis.config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ScheduleModule } from '@nestjs/schedule';
import { CoreModule } from 'src/core/core.module';
import { AdapterModule } from 'src/adapter/adapter.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
      load: [PostgresConfig, RedisConfig],
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
    ScheduleModule.forRoot(),
    CoreModule,
    AdapterModule,
  ],
})
export class AppModule {}