import { Profile } from '../entities/profile.entity';
import { ExcludeMethods } from 'src/lang/types/exclude-methods.type';

export namespace SetProfileContract {
  export const topic = 'set.profile.command';

  export interface Message extends ExcludeMethods<Profile> {}
}
