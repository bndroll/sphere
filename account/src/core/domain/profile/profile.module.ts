import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UserModule } from 'src/core/domain/user/user.module';
import { CategoryModule } from 'src/core/domain/category/category.module';
import { ProfileRepository } from 'src/core/domain/profile/repositories/profile.repository';
import { TagModule } from 'src/core/domain/tag/tag.module';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [UserModule, CategoryModule, TagModule, S3Module],
  providers: [ProfileService, ProfileRepository],
  exports: [ProfileService],
})
export class ProfileModule {}
