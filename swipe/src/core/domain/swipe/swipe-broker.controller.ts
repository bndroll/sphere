import { Controller } from '@nestjs/common';
import { SwipeService } from 'src/core/domain/swipe/swipe.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SwipeContract } from 'src/core/domain/swipe/contract/swipe.contract';

@Controller()
export class SwipeBrokerController {
  constructor(private readonly swipeService: SwipeService) {}

  @MessagePattern(SwipeContract.topic)
  async create(@Payload() message: SwipeContract.Message) {
    await this.swipeService.create(message);
  }
}
