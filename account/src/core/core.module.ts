import { Module } from '@nestjs/common';
import { DomainModule } from 'src/core/domain/domain.module';
import { SharedModule } from 'src/core/shared/shared.module';
import { CommonModule } from 'src/core/common/common.module';

@Module({
  imports: [DomainModule, SharedModule, CommonModule],
})
export class CoreModule {}
