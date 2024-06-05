import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/core/common/base.repository';
import { Swipe, SwipeType } from 'src/core/domain/swipe/entities/swipe.entity';
import {
  FindByProfileIdsAndTypeDto,
  FindByProfileIdsDto,
} from 'src/core/domain/swipe/dto/find-by-profile-ids-and-type.dto';

@Injectable()
export class SwipeRepository extends BaseRepository<Swipe> {
  constructor(private dataSource: DataSource) {
    super(Swipe, dataSource.createEntityManager());
  }

  async findByProfileIdsAndType(dto: FindByProfileIdsAndTypeDto) {
    return await this.createQueryBuilder('s')
      .where('s.profileId = :profileId', { profileId: dto.profileId })
      .andWhere('s.profileRecId = :profileRecId', {
        profileRecId: dto.profileRecId,
      })
      .andWhere('s.type = :type', { type: dto.type })
      .getOne();
  }

  async findByProfileIds(dto: FindByProfileIdsDto) {
    return await this.createQueryBuilder('s')
      .where('s.profileId = :profileId', { profileId: dto.profileId })
      .andWhere('s.profileRecId = :profileRecId', {
        profileRecId: dto.profileRecId,
      })
      .getOne();
  }

  async findOld() {
    const weekAgo = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7);
    return await this.createQueryBuilder('s')
      .where('s.createDate < :weekAgo', { weekAgo })
      .getMany();
  }

  async findNotReactedSwipes(profileId: string) {
    return await this.createQueryBuilder('s')
      .where('s.profileRecId = :profileId', { profileId: profileId })
      .andWhere('s.reaction = :reaction', { reaction: false })
      .andWhere('s.type = :type', { type: SwipeType.Like })
      .getMany();
  }

  async findByProfileId(profileId: string) {
    return await this.createQueryBuilder('s')
      .where('s.profileId = :profileId', { profileId: profileId })
      .orWhere('s.profileRecId = :profileId', { profileId: profileId })
      .getMany();
  }
}
