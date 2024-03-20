import { Inject, Injectable } from '@nestjs/common';
import * as minio from 'minio';
import { generateString } from '@nestjs/typeorm';
import { UploadPictureDto } from './dto/upload-sunthesis.dto';
import { Buckets } from './s3.types';
import { Response } from 'express';
import { S3DeleteObjectDto } from './dto/delete-object.dto';
import * as sharp from 'sharp';

@Injectable()
export class S3Service {
  constructor(@Inject('S3_STORAGE') private readonly s3: minio.Client) {
  }

  async upload(fileData: Buffer, dto: UploadPictureDto) {
    const fileName = `${generateString()}.webp`;
    await this.s3.putObject(Buckets.Picture, fileName, fileData);
    return fileName;
  }

  async getObject(fileName: string, res: Response) {
    const object = await this.s3.getObject(Buckets.Picture, fileName);
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
