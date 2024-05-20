import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './repositories/category.repository';
import { TagModule } from 'src/core/domain/tag/tag.module';
import { CategoryStorage } from 'src/core/domain/category/storages/category.storage';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), TagModule],
  providers: [CategoryService, CategoryRepository, CategoryStorage],
  exports: [CategoryService],
})
export class CategoryModule {}
