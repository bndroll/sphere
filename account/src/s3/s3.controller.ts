import { Controller, Get, Param, Res } from '@nestjs/common';
import { S3Service } from './s3.service';
import { Response } from 'express';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {
  }

  @Get(':fileName')
  async getFile(@Param('fileName') fileName: string, @Res() res: Response) {
    return await this.s3Service.getObject(fileName, res);
  }
}
