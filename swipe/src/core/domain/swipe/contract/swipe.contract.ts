import { SwipeType } from 'src/core/domain/swipe/entities/swipe.entity';

export namespace SwipeContract {
  export const topic = 'create.swipe.command';

  export interface Message {
    profileId: string;
    profileRecId: string;
    type: SwipeType;
  }
}

export namespace SwipeDWHContract {
  export const topic = 'create.swipedwh.command';

  export interface Message {
    profileId: string;
    profileRecId: string;
    type: SwipeType;
  }
}
