import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { StoragePrefixType } from 'src/lang/types/storage-prefix.type';
import { FeatureFlag } from 'src/core/domain/feature-flag/entities/feature-flag.entity';

@Injectable()
export class FeatureFlagStorage {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async insert(featureFlags: FeatureFlag[]): Promise<void> {
    await this.redis.set(this.getKey(), JSON.stringify(featureFlags), 'EX', 60);
  }

  async get(): Promise<FeatureFlag[]> {
    const data = await this.redis.get(this.getKey());
    return JSON.parse(data) as FeatureFlag[];
  }

  private getKey(): string {
    return `${StoragePrefixType.FeatureFlag}`;
  }
}
