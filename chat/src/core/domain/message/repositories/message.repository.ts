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

  async findByChatsIds(chatIds: string[]) {
    return (await this.query(
      `
select m.text, m.created_date, m."chatId" from message m
inner join (
    select "chatId", MAX(created_date) as max_created_date from message
    where "chatId" = ANY($1)
    group by "chatId"
) latest
on m."chatId" = latest."chatId" and m.created_date = latest.max_created_date
order by m.created_date;
    `,
      [chatIds],
    )) as Array<{
      text: string;
      created_date: Date;
      chatId: string;
    }>;
  }
}
