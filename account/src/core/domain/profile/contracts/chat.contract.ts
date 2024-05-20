import { ProfileType } from 'src/core/domain/profile/types/profile.types';

export namespace CreateChatContract {
  export const topic = 'create.chat.command';

  export interface Message {
    profileId: string;
    profileSecondId?: string;
    type: ProfileType;
  }
}
