import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { DomainModule } from './domain/domain.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [CommonModule, DomainModule, SharedModule],
})
export class CoreModule {}
