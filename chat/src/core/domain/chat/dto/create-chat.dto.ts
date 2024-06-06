import { ChatType } from 'src/core/domain/chat/entities/chat.entity';
import { Profile } from 'src/core/domain/chat/entities/profile.entity';

export class CreateChatDto {}

export class CreateChatEntityDto {
  type: ChatType;
  profiles: Profile[];
  name?: string;
}
