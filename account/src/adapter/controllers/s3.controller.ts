import {
  Body,
  Controller,
  Get,
  Param, Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/core/shared/iam/decorators/auth.decorator';
import { AuthType } from 'src/core/shared/iam/enums/auth-type.enum';
import { S3Service } from 'src/s3/s3.service';
import { UploadControllerDto } from 'src/s3/dto/upload-file.dto';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Auth(AuthType.None)
  @Get(':bucket/:file')
  async getFile(
    @Param('bucket') bucket: string,
    @Param('file') file: string,
    @Res() res: Response,
  ) {
    return await this.s3Service.getObject(bucket, file, res);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadControllerDto,
  ) {
    return await this.s3Service.upload({
      data: file.buffer,
      bucket: dto.bucket,
    });
  }
}
