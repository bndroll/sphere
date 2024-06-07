import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { Message } from 'src/core/domain/message/entities/message.entity';
import { Profile } from 'src/core/domain/chat/entities/profile.entity';
import { CreateChatEntityDto } from 'src/core/domain/chat/dto/create-chat.dto';
import { generateString } from '@nestjs/typeorm';

export enum ChatType {
  Single = 'Single',
  Group = 'Group',
}

@Entity('chat')
export class Chat {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true })
  name?: string;

  @Column({ type: 'enum', enum: ChatType })
  type: ChatType;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Relation<Message[]>;

  @ManyToMany(() => Profile, (profile) => profile.chats)
  profiles: Relation<Profile[]>;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createDate: Date;

  static create(dto: CreateChatEntityDto) {
    const instance = new Chat();
    instance.id = generateString();
    instance.name = dto.name;
    instance.type = dto.type;
    instance.messages = [];
    instance.profiles = [];
    return instance;
  }

  updateAddProfile(profile: Profile) {
    this.profiles.push(profile);
  }
}
