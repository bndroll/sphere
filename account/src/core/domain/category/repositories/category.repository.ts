import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Category } from '../entities/category.entity';
import { BaseRepository } from 'src/core/common/base.repository';

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async findAll() {
    return await this.find({ order: { title: 'ASC' } });
  }

  async findByTitle(title: string) {
    return await this.findOneBy({ title });
  }
}
