import { Inject, Injectable } from '@nestjs/common';
import * as minio from 'minio';
import { generateString } from '@nestjs/typeorm';
import { UploadDto } from './dto/upload-file.dto';
import sharp from 'sharp';
import { FastifyReply } from 'fastify';

@Injectable()
export class S3Service {
  constructor(@Inject('S3_STORAGE') private readonly s3: minio.Client) {}

  async upload(dto: UploadDto): Promise<string> {
    const fileName = `${generateString()}.webp`;
    const buffer = await this.convertToWebP(dto.data);
    await this.s3.putObject(dto.bucket, fileName, buffer);
    return `/s3/${dto.bucket}/${fileName}`;
  }

  async getObject(bucket: string, file: string, res: FastifyReply) {
    const object = await this.s3.getObject(bucket, file);
    res.headers({ 'Content-Type': 'image/webp' });
    res.send(object);
  }

  private async convertToWebP(file: Buffer): Promise<Buffer> {
    return sharp(file).webp({ quality: 100 }).toBuffer();
  }
}
