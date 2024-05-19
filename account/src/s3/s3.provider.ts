import { ConfigService } from '@nestjs/config';
import * as minio from 'minio';

export const s3Provider = {
  provide: 'S3_STORAGE',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return new minio.Client({
      endPoint: configService.getOrThrow('MINIO_ENDPOINT'),
      port: Number(configService.getOrThrow('MINIO_PORT')),
      accessKey: configService.getOrThrow('MINIO_ACCESS_KEY'),
      secretKey: configService.getOrThrow('MINIO_SECRET_KEY'),
      useSSL: false,
    });
  },
};
