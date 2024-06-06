import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/core/common/base.repository';
import { Profile } from 'src/core/domain/chat/entities/profile.entity';

@Injectable()
export class ProfileRepository extends BaseRepository<Profile> {
  constructor(private dataSource: DataSource) {
    super(Profile, dataSource.createEntityManager());
  }

  async findByProfileId(profileId: string) {
    return await this.createQueryBuilder('p')
      .where('p.profileId = :profileId', { profileId: profileId })
      .getOne();
  }

  async findChats(profileId: string) {
    return await this.createQueryBuilder('p')
      .leftJoinAndSelect('p.chats', 'chats')
      .where('p.id = :profileId', { profileId })
      .getMany();
  }

  async findProfiles(chatId: string) {
    return await this.createQueryBuilder('p')
      .where('c.chatId = :chatId', { chatId })
      .getOne();
  }

  async findMessagesByProfileAndChat(telegramId: string) {
    return await this.createQueryBuilder('u')
      .where('u.telegram_id = :telegramId', { telegramId })
      .getOne();
  }
}
