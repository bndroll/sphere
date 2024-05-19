import { Module } from '@nestjs/common';
import { SwipeService } from './swipe.service';
import { SwipeRepository } from 'src/core/domain/swipe/repositories/swipe.repository';
import { CommonModule } from 'src/core/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [SwipeService, SwipeRepository],
  exports: [SwipeService],
})
export class SwipeModule {}
