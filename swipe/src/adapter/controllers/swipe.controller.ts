import { Body, Controller, Post } from '@nestjs/common';
import { SwipeService } from 'src/core/domain/swipe/swipe.service';
import { FindProfileDto } from 'src/core/domain/swipe/dto/find-profiles.dto';

@Controller('swipe')
export class SwipeController {
  constructor(private readonly swipeService: SwipeService) {}

  @Post('find-profiles')
  async findProfiles(@Body() dto: FindProfileDto) {
    return await this.swipeService.findProfiles(dto);
  }
}
