import { SwipeType } from 'src/core/domain/swipe/entities/swipe.entity';

export const CreateSwipeTopic = 'swipe.create.command';

export const DWHSwipeTopic = 'swipedwh.create.command';

export class CreateSwipeDto {
  profileId: string;
  profileRecId: string;
  type: SwipeType;
}

export class CreateSwipeEntityDto {
  profileId: string;
  profileRecId: string;
  type: SwipeType;
}
