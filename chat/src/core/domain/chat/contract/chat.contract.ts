export enum ProfileType {
  User = 'User',
  Event = 'Event',
}

export namespace ChatContract {
  export const topic = 'add.chat.command';

  export interface Message {
    profileId: string;
    profileSecondId: string;
  }
}

export namespace CreateChatContract {
  export const topic = 'create.chat.command';

  export interface Message {
    profileId: string;
    profileSecondId?: string;
    type: ProfileType;
  }
}
