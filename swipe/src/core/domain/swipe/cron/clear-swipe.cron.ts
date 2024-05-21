import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SwipeService } from 'src/core/domain/swipe/swipe.service';

@Injectable()
export class ClearSwipeCron {
  constructor(private readonly swipeService: SwipeService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async clearSwipeCron() {
    await this.swipeService.clearSwipe();
  }
}
