import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { generateString } from '@nestjs/typeorm';
import { CreateCategoryEntityDto } from 'src/core/domain/category/dto/create-category.dto';
import { UpdateCategoryTitleEntityDto } from 'src/core/domain/category/dto/update-category.dto';
import { Tag } from 'src/core/domain/tag/entities/tag.entity';
import { Profile } from 'src/core/domain/profile/entities/profile.entity';

@Entity({ name: 'category' })
export class Category {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
  title: string;

  @OneToMany(() => Tag, (tag) => tag.category)
  tags: Relation<Tag[]>;

  @OneToMany(() => Profile, (profile) => profile.category)
  profiles: Relation<Profile[]>;

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
