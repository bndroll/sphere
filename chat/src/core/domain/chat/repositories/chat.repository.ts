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
}
