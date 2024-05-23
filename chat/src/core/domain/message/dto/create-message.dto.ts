import { Chat } from 'src/core/domain/chat/entities/chat.entity';
import { Profile } from 'src/core/domain/chat/entities/profile.entity';

export class CreateMessageDto {
  profileId: string;
  chatId: string;
  text: string;
}

export class CreateMessageEntityDto {
  chat: Chat;
  profile: Profile;
  text: string;
}
