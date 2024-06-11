import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/core/common/base.repository';
import { Profile } from 'src/core/domain/chat/entities/profile.entity';
import { FindMessagesDto } from 'src/core/domain/message/dto/find-messages.dto';

@Injectable()
export class ProfileRepository extends BaseRepository<Profile> {
  constructor(private dataSource: DataSource) {
    super(Profile, dataSource.createEntityManager());
  }

  async findByProfileId(profileId: string) {
    return await this.createQueryBuilder('p')
      .where('p.id = :profileId', { profileId: profileId })
      .getOne();
  }

  async findChats(userId: string) {
    return await this.createQueryBuilder('p')
      .leftJoinAndSelect('p.chats', 'chats')
      .where('p.userId = :userId', { userId: userId })
      .getMany();
  }

  async findByUserId(userId: string) {
    return await this.createQueryBuilder('p')
      .where('p.userId = :userId', { userId: userId })
      .getOne();
  }

  async findByChatId(chatId: string) {
    return await this.createQueryBuilder('p')
      .leftJoinAndSelect('p.chats', 'c')
      .where('c.id = :chatId', { chatId: chatId })
      .getMany();
  }

  async findByChatIdAndUserId(dto: FindMessagesDto) {
    return await this.createQueryBuilder('p')
      .leftJoin('p.chats', 'c')
      .where('c.id = :chatId', { chatId: dto.chatId })
      .andWhere('p.userId = :userId', { userId: dto.userId })
      .getOne();
  }
}
