import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/core/common/base.repository';
import { Chat, ChatType } from 'src/core/domain/chat/entities/chat.entity';

@Injectable()
export class ChatRepository extends BaseRepository<Chat> {
  constructor(private dataSource: DataSource) {
    super(Chat, dataSource.createEntityManager());
  }

  async findByProfileId(profileId: string) {
    return await this.createQueryBuilder('c')
      .leftJoinAndSelect('c.profiles', 'p')
      .where('p.profileId = :profileId', { profileId: profileId })
      .getOne();
  }

  async findByProfileIdAndProfileRecId(
    profileId: string,
    profileRecId: string,
  ) {
    return await this.createQueryBuilder('c')
      .leftJoinAndSelect('c.profiles', 'p')
      .where('p.profileId IN (:...ids)', { ids: [profileId, profileRecId] })
      .andWhere('c.type = :type', { type: ChatType.Single })
      .getOne();
  }

  async findByUserId(userId: string) {
    const chatsIds = await this.createQueryBuilder('c')
      .select('c.id')
      .leftJoin('c.profiles', 'p')
      .andWhere('p.userId = :userId', { userId: userId })
      .getMany()
      .then((r) => r.map((item) => item.id));

    const singleChats = await this.createQueryBuilder('c')
      .leftJoinAndSelect('c.profiles', 'p')
      .where('p.userId != :userId', { userId: userId })
      .andWhere('c.type = :type', { type: ChatType.Single })
      .andWhere('c.id IN (:...ids)', { ids: chatsIds })
      .getMany();

    const groupChats = await this.createQueryBuilder('c')
      .leftJoinAndSelect('c.profiles', 'p')
      .where(`p.info->>'name' = c.name`)
      .andWhere('c.type = :type', { type: ChatType.Group })
      .andWhere('c.id IN (:...ids)', { ids: chatsIds })
      .getMany();

    return [...singleChats, ...groupChats];
  }
}
