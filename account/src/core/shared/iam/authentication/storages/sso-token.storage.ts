import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { StoragePrefixType } from 'src/lang/types/storage-prefix.type';
import { SaveSsoDto } from 'src/core/shared/iam/authentication/dto/save-sso.dto';

@Injectable()
export class SsoTokenStorage {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async insert(verifyCode: string, dto: SaveSsoDto): Promise<void> {
    await this.redis.set(
      this.getKey(verifyCode),
      JSON.stringify(dto),
      'EX',
      60 * 10,
    );
  }

  async get(code: string): Promise<SaveSsoDto> {
    const data = await this.redis.get(this.getKey(code));
    return JSON.parse(data) as SaveSsoDto;
  }

  async invalidate(token: string): Promise<void> {
    await this.redis.del(this.getKey(token));
  }

  private getKey(token: string): string {
    return `${StoragePrefixType.SsoToken}-${token}`;
  }
}
