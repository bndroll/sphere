import { Module } from '@nestjs/common';
import { SwipeModule } from 'src/core/domain/swipe/swipe.module';
import { SwipeController } from 'src/adapter/controllers/swipe.controller';

@Module({
  imports: [SwipeModule],
  controllers: [SwipeController],
})
export class AdapterModule {}
