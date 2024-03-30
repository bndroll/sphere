import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/core/domain/category/category.module';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [CategoryModule, UserModule, TagModule, ProfileModule],
})
export class DomainModule {}
