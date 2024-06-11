import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from 'src/core/domain/chat/chat.service';
import { MessageService } from 'src/core/domain/message/message.service';
import { ProfileService } from 'src/core/domain/chat/profile.service';
import { FindMessagesDto } from 'src/core/domain/message/dto/find-messages.dto';

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

  @Post('find-messages')
  async findMessages(@Body() dto: FindMessagesDto) {
    return await this.messageService.findByChat(dto);
  }
}
