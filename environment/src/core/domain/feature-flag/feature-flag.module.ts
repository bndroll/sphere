import { Module } from '@nestjs/common';
import { FeatureFlagService } from './feature-flag.service';
import { FeatureFlagRepository } from 'src/core/domain/feature-flag/repositories/feature-flag.repository';
import { FeatureFlagStorage } from 'src/core/domain/feature-flag/storages/feature-flag.storage';

@Module({
  providers: [FeatureFlagService, FeatureFlagRepository, FeatureFlagStorage],
  exports: [FeatureFlagService],
})
export class FeatureFlagModule {}
