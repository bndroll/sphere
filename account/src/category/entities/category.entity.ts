import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { CreateCategoryEntityDto, UpdateCategoryTitleEntityDto } from './dto/category-entity.dto';
import { generateString } from '@nestjs/typeorm';

@Entity('category')
export class Category {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
  title: string;

  @UpdateDateColumn({ name: 'updated_date', default: new Date() })
  updatedDate: Date;

  @CreateDateColumn({ name: 'created_date', default: new Date() })
  createDate: Date;

  static create(dto: CreateCategoryEntityDto) {
    const instance = new Category();

    instance.id = generateString();
    instance.title = dto.title;

    const date = new Date();

    instance.updatedDate = date;
    instance.createDate = date;

    return instance;
  }

  updateTitle(dto: UpdateCategoryTitleEntityDto) {
    this.title = dto.title;
    this.updatedDate = new Date();
  }
}
