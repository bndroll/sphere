import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { Chat } from 'src/core/domain/chat/entities/chat.entity';
import { Message } from 'src/core/domain/message/entities/message.entity';
import { generateString } from '@nestjs/typeorm';
import { CreateProfileEntityDto } from 'src/core/domain/chat/dto/create-profile.dtp';

export class ProfileInfo {
  name: string;
  avatar: string;
}

@Entity('profile')
export class Profile {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToMany(() => Chat, (chat) => chat.profiles, { eager: true })
  @JoinTable()
  chats: Relation<Chat[]>;

  @OneToMany(() => Message, (message) => message.profile)
  messages: Relation<Message[]>;

  @Column('uuid', { name: 'profile_id' })
  profileId: string;

  @Column('jsonb')
  info: ProfileInfo;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createDate: Date;

  static create(dto: CreateProfileEntityDto) {
    const instance = new Profile();
    instance.id = generateString();
    instance.profileId = dto.profileId;
    instance.info = dto.info;
    instance.chats = [];
    instance.messages = [];
    return instance;
  }

  updateAddChat(chat: Chat) {
    this.chats.push(chat);
  }
}
