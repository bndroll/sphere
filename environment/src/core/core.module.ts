import { Module } from '@nestjs/common';
import { DomainModule } from 'src/core/domain/domain.module';
import { SharedModule } from 'src/core/shared/shared.module';

@Module({
  imports: [DomainModule, SharedModule],
})
export class CoreModule {}
