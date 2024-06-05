export namespace DeleteProfileContract {
  export const topic = 'delete.profile.command';

  export interface Message {
    id: string;
  }
}
