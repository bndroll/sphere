import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { S3Service } from './s3.service';
import { ConfigModule } from '@nestjs/config';
import { s3Provider } from './s3.provider';
import * as minio from 'minio';
import { Buckets } from './s3.types';

@Module({
  imports: [ConfigModule],
  providers: [S3Service, s3Provider],
  exports: [S3Service],
})
export class S3Module implements OnApplicationBootstrap {
  constructor(@Inject('S3_STORAGE') private readonly s3: minio.Client) {}

  async onApplicationBootstrap() {
    const buckets = Object.values(Buckets);
    for (const bucket of buckets) {
      const existingBucket = await this.s3.bucketExists(bucket);
      if (!existingBucket) {
        await this.s3.makeBucket(bucket);
      }
    }
  }
}
