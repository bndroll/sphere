import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Message } from 'src/core/domain/message/entities/message.entity';
import { BaseRepository } from 'src/core/common/base.repository';

@Injectable()
export class MessageRepository extends BaseRepository<Message> {
  constructor(private dataSource: DataSource) {
    super(Message, dataSource.createEntityManager());
  }

  async findByChatId(chatId: string) {
    return await this.createQueryBuilder('m')
      .leftJoinAndSelect('m.profile', 'profile')
      .where('m.chatId = :chatId', { chatId })
      .orderBy('m.createDate', 'DESC')
      .getMany();
  }
}
