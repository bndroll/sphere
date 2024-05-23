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
}
