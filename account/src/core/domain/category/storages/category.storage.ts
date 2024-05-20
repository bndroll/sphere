import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { StoragePrefixType } from 'src/lang/types/storage-prefix.type';
import { Category } from 'src/core/domain/category/entities/category.entity';

@Injectable()
export class CategoryStorage {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async insert(categories: Category[]): Promise<void> {
    await this.redis.set(this.getKey(), JSON.stringify(categories));
  }

  async invalidate(): Promise<void> {
    await this.redis.del(this.getKey());
  }

  async get(): Promise<Category[]> {
    const data = await this.redis.get(this.getKey());
    return JSON.parse(data) as Category[];
  }

  private getKey(): string {
    return `${StoragePrefixType.Categories}`;
  }
}
