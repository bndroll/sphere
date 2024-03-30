import { registerAs } from '@nestjs/config';
import { RedisModuleOptions } from '@nestjs-modules/ioredis';

export const RedisConfig = registerAs(
  'redis',
  (): RedisModuleOptions => ({
    type: 'single',
    options: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
    },
  }),
);
