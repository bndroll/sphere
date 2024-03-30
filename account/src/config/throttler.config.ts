import { registerAs } from '@nestjs/config';
import { ThrottlerModuleOptions } from '@nestjs/throttler/dist/throttler-module-options.interface';

export const ThrottlerConfig = registerAs(
  'throttler',
  (): ThrottlerModuleOptions => ({
    throttlers: [
      {
        name: 'short',
        ttl: parseInt(process.env.THROTTLER_SHORT_TTL),
        limit: parseInt(process.env.THROTTLER_SHORT_LIMIT),
      },
      {
        name: 'medium',
        ttl: parseInt(process.env.THROTTLER_MEDIUM_TTL),
        limit: parseInt(process.env.THROTTLER_MEDIUM_LIMIT),
      },
      {
        name: 'long',
        ttl: parseInt(process.env.THROTTLER_LONG_TTL),
        limit: parseInt(process.env.THROTTLER_LONG_LIMIT),
      },
    ],
  }),
);
