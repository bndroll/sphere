import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/core/common/base.repository';
import { Profile } from 'src/core/domain/profile/entities/profile.entity';
import { FindUserProfileByUserIdDto } from 'src/core/domain/profile/dto/find-user-profile-by-user-id.dto';
import { ProfileType } from 'src/core/domain/profile/types/profile.types';
import { FindUserEventsByCategoryDto } from 'src/core/domain/profile/dto/find-user-events-by-category.dto';
import { FindByIdsDto } from 'src/core/domain/profile/dto/find-by-ids.dto';

@Injectable()
export class ProfileRepository extends BaseRepository<Profile> {
  constructor(private dataSource: DataSource) {
    super(Profile, dataSource.createEntityManager());
  }

  async findLastUserProfileByUserId(dto: FindUserProfileByUserIdDto) {
    return await this.createQueryBuilder('p')
      .leftJoinAndSelect('p.category', 'category')
      .where('p.userId = :userId', { userId: dto.userId })
      .andWhere('p.type = :type', { type: ProfileType.User })
      .getOne();
  }

  async findByUserId(userId: string): Promise<Profile[]> {
    return await this.createQueryBuilder('p')
      .innerJoinAndSelect('p.user', 'user')
      .innerJoinAndSelect('p.category', 'category')
      .innerJoinAndSelect('p.tags', 'tags')
      .where('p.userId = :userId', { userId })
      .getMany();
  }

  async findFullById(id: string): Promise<Profile> {
    return await this.createQueryBuilder('p')
      .leftJoinAndSelect('p.user', 'user')
      .leftJoinAndSelect('p.category', 'category')
      .leftJoinAndSelect('p.tags', 'tags')
      .where('p.id = :id', { id })
      .getOne();
  }

  async findProfilesByIds(dto: FindByIdsDto) {
    return await this.createQueryBuilder('p')
      .innerJoinAndSelect('p.user', 'user')
      .innerJoinAndSelect('p.category', 'category')
      .leftJoinAndSelect('p.tags', 'tags')
      .where('p.id IN (:...ids)', { ids: dto.ids })
      .getMany();
  }

  async userEventsCountByCategory(dto: FindUserEventsByCategoryDto) {
    return await this.createQueryBuilder('p')
      .where('p.userId = :userId', { userId: dto.userId })
      .andWhere('p.categoryId = :categoryId', { categoryId: dto.categoryId })
      .getCount();
  }
}
