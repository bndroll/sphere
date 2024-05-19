import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/core/common/base.repository';
import { Swipe } from 'src/core/domain/swipe/entities/swipe.entity';
import { FindByProfileIdsAndTypeDto } from 'src/core/domain/swipe/dto/find-by-profile-ids-and-type.dto';

@Injectable()
export class SwipeRepository extends BaseRepository<Swipe> {
  constructor(private dataSource: DataSource) {
    super(Swipe, dataSource.createEntityManager());
  }

  async findByProfileIdsAndType(dto: FindByProfileIdsAndTypeDto) {
    return await this.createQueryBuilder('s')
      .where('s.profileId = :profileId', { profileId: dto.profileId })
      .andWhere('s.type = :profileRecId', { type: dto.profileRecId })
      .andWhere('s.type = :type', { type: dto.type })
      .getOne();
  }
}
