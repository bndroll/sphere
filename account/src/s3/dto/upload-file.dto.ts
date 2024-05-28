import { Buckets } from 'src/s3/s3.types';
import { MemoryStorageFile } from '@blazity/nest-file-fastify';

export type UploadControllerDto = Omit<UploadDto, 'data'>;

export class UploadDto {
  bucket: Buckets;
  file: MemoryStorageFile;
}
