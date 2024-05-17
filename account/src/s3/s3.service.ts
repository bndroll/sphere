import { Inject, Injectable } from '@nestjs/common';
import * as minio from 'minio';
import { generateString } from '@nestjs/typeorm';
import { UploadDto } from './dto/upload-file.dto';
import { Response } from 'express';
import * as sharp from 'sharp';

@Injectable()
export class S3Service {
  constructor(@Inject('S3_STORAGE') private readonly s3: minio.Client) {}

  async upload(dto: UploadDto) {
    const fileName = `${generateString()}.webp`;
    const webpData = await this.convertToWebP(dto.data);
    await this.s3.putObject(dto.bucket, fileName, webpData);
    return `/s3/${fileName}`;
  }

  async getObject(bucket: string, file: string, res: Response) {
    const object = await this.s3.getObject(bucket, file);
    res.set({ 'Content-Type': 'image/webp' });
    object.pipe(res);
  }

  private async convertToWebP(file: Buffer): Promise<Buffer> {
    return sharp(file).webp().toBuffer();
  }
}
