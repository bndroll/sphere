import { Buckets } from 'src/s3/s3.types';

export type UploadControllerDto = Omit<UploadDto, 'data'>;

export class UploadDto {
  bucket: Buckets;
  data: Buffer;
}
