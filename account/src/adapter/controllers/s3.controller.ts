import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Auth } from 'src/core/shared/iam/decorators/auth.decorator';
import { AuthType } from 'src/core/shared/iam/enums/auth-type.enum';
import { S3Service } from 'src/s3/s3.service';
import {
  FileInterceptor,
  UploadedFile,
  MemoryStorageFile,
} from '@blazity/nest-file-fastify';
import { UploadControllerDto } from 'src/s3/dto/upload-file.dto';
import { FastifyReply } from 'fastify';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Auth(AuthType.None)
  @Get(':bucket/:file')
  async getFile(
    @Param('bucket') bucket: string,
    @Param('file') file: string,
    @Res() res: FastifyReply,
  ) {
    return await this.s3Service.getObject(bucket, file, res);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: MemoryStorageFile,
    @Body() dto: UploadControllerDto,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return await this.s3Service.upload({
      file: file,
      bucket: dto.bucket,
    });
  }
}
