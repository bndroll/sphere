import { Module } from '@nestjs/common';
import { FeatureFlagModule } from './feature-flag/feature-flag.module';

@Module({
  imports: [FeatureFlagModule],
})
export class DomainModule {}
