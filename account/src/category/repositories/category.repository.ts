import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async findAll() {
    return await this.find({ order: { title: 'ASC' } });
  }

  async findById(id: string) {
    return await this.findOneBy({ id });
  }

  async findByTitle(title: string) {
    return await this.findOneBy({ title });
  }
}
