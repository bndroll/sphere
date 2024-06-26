import { Module } from '@nestjs/common';
import { SwipeService } from './swipe.service';
import { SwipeRepository } from 'src/core/domain/swipe/repositories/swipe.repository';
import { CommonModule } from 'src/core/common/common.module';
import { SwipeBrokerController } from 'src/core/domain/swipe/swipe-broker.controller';
import { HttpModule } from '@nestjs/axios';
import { ClearSwipeCron } from 'src/core/domain/swipe/cron/clear-swipe.cron';

@Module({
  imports: [CommonModule, HttpModule],
  controllers: [SwipeBrokerController],
  providers: [SwipeService, SwipeRepository, ClearSwipeCron],
  exports: [SwipeService],
})
export class SwipeModule {}
