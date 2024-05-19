import { SwipeType } from 'src/core/domain/swipe/entities/swipe.entity';

export class CreateSwipeEntityDto {
  profileId: string;
  profileRecId: string;
  type: SwipeType;
}
