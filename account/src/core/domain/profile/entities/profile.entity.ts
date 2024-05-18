import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/core/domain/user/entities/user.entity';
import { Category } from 'src/core/domain/category/entities/category.entity';
import { Tag } from 'src/core/domain/tag/entities/tag.entity';
import {
  ProfileInfo,
  ProfileType,
  ProfileVisible,
} from 'src/core/domain/profile/types/profile.types';
import { CreateProfileEntityDto } from 'src/core/domain/profile/dto/create-profile.dto';
import { generateString } from '@nestjs/typeorm';
import { UpdateProfileEntityDto } from 'src/core/domain/profile/dto/update-profile.dto';

@Entity({ name: 'profile' })
export class Profile {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.profiles, { eager: true })
  user: Relation<User>;

  @ManyToOne(() => Category, (category) => category.profiles, { eager: true })
  category: Relation<Category>;

  @ManyToMany(() => Tag, (tag) => tag.profiles, { eager: true })
  @JoinTable()
  tags: Relation<Tag[]>;

  @Column({ type: 'enum', enum: ProfileType })
  type: ProfileType;

  @Column('jsonb')
  info: ProfileInfo;

  @Column({ type: 'enum', enum: ProfileVisible, default: ProfileVisible.Open })
  visible: ProfileVisible;

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

  static create(dto: CreateProfileEntityDto) {
    const instance = new Profile();
    instance.id = generateString();
    instance.user = dto.user;
    instance.category = dto.category;
    instance.tags = dto.tags;
    instance.type = dto.type;
    instance.info = dto.info;
    instance.visible = dto.visible;
    return instance;
  }

  update(dto: UpdateProfileEntityDto) {
    this.visible = dto.visible ?? this.visible;
    this.tags = dto.tags.length > 0 ? dto.tags : this.tags;
    this.info = { ...this.info, ...dto.info };
  }
}
