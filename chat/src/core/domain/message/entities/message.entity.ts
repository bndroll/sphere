import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { Chat } from 'src/core/domain/chat/entities/chat.entity';
import { CreateMessageEntityDto } from 'src/core/domain/message/dto/create-message.dto';
import { generateString } from '@nestjs/typeorm';
import { Profile } from 'src/core/domain/chat/entities/profile.entity';

@Entity('message')
export class Message {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => Chat, (chat) => chat.messages, { eager: true })
  chat: Relation<Chat>;

  @ManyToOne(() => Profile, (profile) => profile.messages, {
    eager: true,
  })
  profile: Relation<Profile>;

  @Column('varchar')
  text: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createDate: Date;

  static create(dto: CreateMessageEntityDto) {
    const instance = new Message();
    instance.id = generateString();
    instance.chat = dto.chat;
    instance.profile = dto.profile;
    instance.text = dto.text;
    return instance;
  }
}
