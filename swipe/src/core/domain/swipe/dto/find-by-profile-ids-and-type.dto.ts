import { SwipeType } from 'src/core/domain/swipe/entities/swipe.entity';

export class FindByProfileIdsAndTypeDto {
  profileId: string;
  profileRecId: string;
  type: SwipeType;
}