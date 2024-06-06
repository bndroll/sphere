import { Inject, Injectable, Logger } from '@nestjs/common';
import * as minio from 'minio';
import { generateString } from '@nestjs/typeorm';
import { UploadDto } from './dto/upload-file.dto';
import sharp from 'sharp';
import { FastifyReply } from 'fastify';
import { MemoryStorageFile } from '@blazity/nest-file-fastify';
import convert from 'heic-convert';

@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);

  constructor(@Inject('S3_STORAGE') private readonly s3: minio.Client) {}

  async upload(dto: UploadDto): Promise<string> {
    let fileName = `${generateString()}`;
    let buffer: Buffer = dto.file.buffer;
    try {
      buffer = await this.convertToWebP(dto.file);
      fileName = fileName + '.webp';
    } catch (e) {
      this.logger.error('Error while converting image to webp');
      fileName = fileName + dto.file.mimetype;
    }
    await this.s3.putObject(dto.bucket, fileName, buffer);
    return `/s3/${dto.bucket}/${fileName}`;
  }

  async getObject(bucket: string, file: string, res: FastifyReply) {
    const object = await this.s3.getObject(bucket, file);
    res.headers({ 'Content-Type': 'image/webp' });
    res.send(object);
  }

  private async convertToWebP(file: MemoryStorageFile): Promise<Buffer> {
    if (file.mimetype === 'image/heic') {
      const outputBuffer = await convert({
        buffer: file.buffer,
        format: 'JPEG',
        quality: 1,
      });
      return sharp(outputBuffer)
        .withMetadata()
        .rotate()
        .webp({ quality: 100 })
        .toBuffer();
    } else {
      return sharp(file.buffer)
        .withMetadata()
        .rotate()
        .webp({ quality: 100 })
        .toBuffer();
    }
  }
}
