import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { DomainModule } from './domain/domain.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [SharedModule, DomainModule, CommonModule],
})
export class CoreModule {}
