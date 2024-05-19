import { Module } from '@nestjs/common';
import { SwipeModule } from './swipe/swipe.module';

@Module({
  imports: [SwipeModule],
})
export class DomainModule {}
