import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { StoragePrefixType } from 'src/lang/types/storage-prefix.type';
import { Profile } from 'src/core/domain/profile/entities/profile.entity';

@Injectable()
export class ProfileStorage {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async insert(...profiles: Profile[]): Promise<void> {
    for (const profile of profiles) {
      await this.redis.set(
        this.getKey(profile.id),
        JSON.stringify(profile),
        'EX',
        60 * 20,
      );
    }
  }

  async invalidate(...ids: string[]): Promise<void> {
    for (const id of ids) {
      await this.redis.del(this.getKey(id));
    }
  }

  async get(id: string): Promise<Profile> {
    const data = await this.redis.get(this.getKey(id));
    return JSON.parse(data) as Profile;
  }

  async getMany(...ids: string[]): Promise<Profile[]> {
    const data: Profile[] = [];
    for (const id of ids) {
      const profile = await this.redis.get(this.getKey(id));
      if (profile) {
        data.push(JSON.parse(profile));
      }
    }
    return data.filter((item) => item);
  }

  private getKey(id: string): string {
    return `${StoragePrefixType.Profile}-${id}`;
  }
}
