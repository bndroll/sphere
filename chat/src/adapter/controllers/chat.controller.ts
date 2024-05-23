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

  @Get('find-chats/:profileId')
  async findChats(@Param('profileId') profileId: string) {
    return await this.profileService.findChats(profileId);
  }

  @Get(':id')
  async findMessages(@Param('id') id: string) {
    return await this.messageService.findByChat(id);
  }
}
