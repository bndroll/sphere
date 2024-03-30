import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { generateString } from '@nestjs/typeorm';
import { CreateCategoryEntityDto } from 'src/core/domain/category/dto/create-category.dto';
import { UpdateCategoryTitleEntityDto } from 'src/core/domain/category/dto/update-category.dto';

@Entity({ name: 'category' })
export class Category {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
  title: string;

  // TODO one to many to tag

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedDate: Date;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createDate: Date;

  static create(dto: CreateCategoryEntityDto) {
    const instance = new Category();
    instance.id = generateString();
    instance.title = dto.title;
    return instance;
  }

  updateTitle(dto: UpdateCategoryTitleEntityDto) {
    this.title = dto.title;
  }
}
