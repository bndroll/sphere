import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/core/common/base.repository';
import { FeatureFlag } from 'src/core/domain/feature-flag/entities/feature-flag.entity';

@Injectable()
export class FeatureFlagRepository extends BaseRepository<FeatureFlag> {
  constructor(private dataSource: DataSource) {
    super(FeatureFlag, dataSource.createEntityManager());
  }

  async findAll() {
    return await this.createQueryBuilder('ff')
      .orderBy('title', 'ASC')
      .getMany();
  }
}
