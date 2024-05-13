import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { Category } from 'src/core/domain/category/entities/category.entity';
import { generateString } from '@nestjs/typeorm';
import { CreateTagEntityDto } from 'src/core/domain/tag/dto/create-tag.dto';
import { UpdateTagEntityDto } from 'src/core/domain/tag/dto/update-tag.dto';

@Entity({ name: 'tag' })
export class Tag {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
  title: string;

  @ManyToOne(() => Category, (category) => category.tags, { eager: true })
  category: Relation<Category>;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createDate: Date;

  static create(dto: CreateTagEntityDto) {
    const instance = new Tag();
    instance.id = generateString();
    instance.title = dto.title;
    instance.category = dto.category;
    return instance;
  }

  updateTitle(dto: UpdateTagEntityDto) {
    this.title = dto.title;
  }
}
