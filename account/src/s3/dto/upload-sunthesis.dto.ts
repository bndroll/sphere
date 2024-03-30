import { Buckets } from 'src/s3/s3.types';

export class UploadDto {
  bucket: Buckets;
  data: Buffer;
}
