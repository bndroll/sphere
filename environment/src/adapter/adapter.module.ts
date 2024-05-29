import { Module } from '@nestjs/common';
import { FeatureFlagController } from 'src/adapter/controllers/feature-flag.controller';
import { FeatureFlagModule } from 'src/core/domain/feature-flag/feature-flag.module';

@Module({
  imports: [FeatureFlagModule],
  controllers: [FeatureFlagController],
})
export class AdapterModule {}
