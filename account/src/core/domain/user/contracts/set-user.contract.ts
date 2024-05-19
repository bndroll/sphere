import { User } from 'src/core/domain/user/entities/user.entity';
import { ExcludeMethods } from 'src/lang/types/exclude-methods.type';

export namespace SetUserContract {
  export const topic = 'set.user.command';

  export interface Message extends ExcludeMethods<User> {}
}
