import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
} from 'typeorm';
import { CreateSwipeEntityDto } from 'src/core/domain/swipe/dto/create-swipe.dto';
import { generateString } from '@nestjs/typeorm';

export enum SwipeType {
  Like = 'like',
  Dislike = 'dislike',
  Skip = 'skip',
}

@Entity({ name: 'swipe' })
export class Swipe {
  @PrimaryColumn('uuid')
  id: string;

  @Index()
  @Column('uuid', { name: 'profile_id' })
  profileId: string;

  @Index()
  @Column('uuid', { name: 'profile_rec_id' })
  profileRecId: string;

  @Index()
  @Column({ type: 'enum', enum: SwipeType })
  type: SwipeType;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createDate: Date;

  static create(dto: CreateSwipeEntityDto) {
    const instance = new Swipe();
    instance.id = generateString();
    instance.profileId = dto.profileId;
    instance.profileRecId = dto.profileRecId;
    instance.type = dto.type;
    return instance;
  }
}
