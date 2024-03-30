import { Inject, Injectable } from '@nestjs/common';
import * as minio from 'minio';
import { generateString } from '@nestjs/typeorm';
import { UploadDto } from './dto/upload-sunthesis.dto';
import { Buckets } from './s3.types';
import { Response } from 'express';
import { S3DeleteObjectDto } from './dto/delete-object.dto';
import * as sharp from 'sharp';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  constructor(
    @Inject('S3_STORAGE') private readonly s3: minio.Client,
    private readonly configService: ConfigService,
  ) {}

  async upload(dto: UploadDto) {
    const fileName = `${generateString()}.webp`;
    await this.s3.putObject(dto.bucket, fileName, dto.data);
    return `${this.configService.get('URL')}/s3/${fileName}`;
  }

  async getObject(bucket: string, file: string, res: Response) {
    const object = await this.s3.getObject(bucket, file);
    res.set({ 'Content-Type': 'image/webp' });
    object.pipe(res);
  }

  async deleteObject(dto: S3DeleteObjectDto) {
    await this.s3.removeObject(Buckets.Picture, dto.fileName);
  }

  private async convertToWebP(file: Buffer): Promise<Buffer> {
    return sharp(file).webp().toBuffer();
  }
}
