import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { StoragePrefixType } from 'src/lang/types/storage-prefix.type';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { User } from 'src/core/domain/user/entities/user.entity';

@Injectable()
export class UserStorage {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async insert(user: User): Promise<void> {
    await this.redis.set(
      this.getKey(user.id),
      JSON.stringify(user),
      'EX',
      60 * 60,
    );
  }

  async invalidate(id: string): Promise<void> {
    await this.redis.del(this.getKey(id));
  }

  async get(id: string): Promise<User> {
    const data = await this.redis.get(this.getKey(id));
    return JSON.parse(data) as User;
  }

  private getKey(id: string): string {
    return `${StoragePrefixType.User}-${id}`;
  }
}
