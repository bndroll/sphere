import { Controller } from '@nestjs/common';
import { SwipeService } from 'src/core/domain/swipe/swipe.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateSwipeDto,
  CreateSwipeTopic,
} from 'src/core/domain/swipe/dto/create-swipe.dto';

@Controller()
export class SwipeBrokerController {
  constructor(private readonly swipeService: SwipeService) {}

  @MessagePattern(CreateSwipeTopic)
  async create(@Payload() message: CreateSwipeDto) {
    await this.swipeService.create(message);
  }
}
