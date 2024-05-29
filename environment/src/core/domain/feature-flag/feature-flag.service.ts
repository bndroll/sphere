import { Injectable } from '@nestjs/common';
import { FeatureFlagRepository } from 'src/core/domain/feature-flag/repositories/feature-flag.repository';
import { FeatureFlagStorage } from 'src/core/domain/feature-flag/storages/feature-flag.storage';

@Injectable()
export class FeatureFlagService {
  constructor(
    private readonly featureFlagRepository: FeatureFlagRepository,
    private readonly featureFlagStorage: FeatureFlagStorage,
  ) {}

  async findAll() {
    const cachedFeatureFlags = await this.featureFlagStorage.get();
    if (!cachedFeatureFlags || cachedFeatureFlags.length === 0) {
      const featureFlags = await this.featureFlagRepository.findAll();
      await this.featureFlagStorage.insert(featureFlags);
      return featureFlags;
    }

    return cachedFeatureFlags;
  }
}
