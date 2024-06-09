import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from 'src/core/domain/chat/chat.service';
import { MessageService } from 'src/core/domain/message/message.service';
import { ProfileService } from 'src/core/domain/chat/profile.service';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
    private readonly profileService: ProfileService,
  ) {}

  @Get('find-chats/:userId')
  async findChats(@Param('userId') userId: string) {
    return await this.profileService.findChats(userId);
  }

  @Get('find-messages/:id')
  async findMessages(@Param('id') id: string) {
    return await this.messageService.findByChat(id);
  }
}
