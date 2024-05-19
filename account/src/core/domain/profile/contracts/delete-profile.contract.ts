import { Profile } from 'src/core/domain/profile/entities/profile.entity';

export namespace DeleteProfileContract {
  export const topic = 'delete.profile.command';

  export interface Message extends Pick<Profile, 'id'> {}
}
