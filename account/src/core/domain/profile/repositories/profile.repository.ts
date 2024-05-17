import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/core/common/base.repository';
import { Profile } from 'src/core/domain/profile/entities/profile.entity';
import { FindUserProfileByCategoryDto } from 'src/core/domain/profile/dto/find-user-profile-by-category.dto';
import { ProfileType } from 'src/core/domain/profile/types/profile.types';

@Injectable()
export class ProfileRepository extends BaseRepository<Profile> {
  constructor(private dataSource: DataSource) {
    super(Profile, dataSource.createEntityManager());
  }

  async findUserProfileByCategory(dto: FindUserProfileByCategoryDto) {
    return await this.createQueryBuilder('p')
      .where('p.categoryId = :categoryId', { categoryId: dto.categoryId })
      .andWhere('p.userId = :userId', { userId: dto.userId })
      .andWhere('p.type = :type', { type: ProfileType.User })
      .getOne();
  }

  async findByUserId(userId: string) {
    return await this.createQueryBuilder('u')
      .where('p.userId = :userId', { userId })
      .getOne();
  }
}
