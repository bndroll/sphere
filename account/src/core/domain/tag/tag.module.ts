import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/core/domain/tag/entities/tag.entity';
import { TagRepository } from 'src/core/domain/tag/repositories/tag.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagService, TagRepository],
  exports: [TagService],
})
export class TagModule {}
