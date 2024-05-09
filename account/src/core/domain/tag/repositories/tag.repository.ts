import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/core/common/base.repository';
import { Tag } from 'src/core/domain/tag/entities/tag.entity';

@Injectable()
export class TagRepository extends BaseRepository<Tag> {
  constructor(private dataSource: DataSource) {
    super(Tag, dataSource.createEntityManager());
  }

  async findAll() {
    return await this.createQueryBuilder('t').orderBy('title', 'ASC').getMany();
  }

  async findByTitle(title: string) {
    return await this.createQueryBuilder('t')
      .where('t.title = :title', { title })
      .getOne();
  }

  async findByCategoryId(categoryId: string) {
    return await this.createQueryBuilder('t')
      .leftJoin('t.category', 'c')
      .where('c.id = :categoryId', { categoryId })
      .getOne();
  }
}
