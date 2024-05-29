import { Controller, Get } from '@nestjs/common';
import { FeatureFlagService } from 'src/core/domain/feature-flag/feature-flag.service';

@Controller('feature-flag')
export class FeatureFlagController {
  constructor(private readonly featureFlagService: FeatureFlagService) {}

  @Get()
  async findAll() {
    return await this.featureFlagService.findAll();
  }
}
