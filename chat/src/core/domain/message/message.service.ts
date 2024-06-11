import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from 'src/core/domain/message/entities/message.entity';
import { MessageRepository } from 'src/core/domain/message/repositories/message.repository';
import { ChatService } from 'src/core/domain/chat/chat.service';
import { ProfileService } from 'src/core/domain/chat/profile.service';
import { FindMessagesDto } from 'src/core/domain/message/dto/find-messages.dto';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly profileService: ProfileService,
    private readonly chatService: ChatService,
  ) {}

  async create(dto: CreateMessageDto) {
    const chat = await this.chatService.findById(dto.chatId);
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    const profile = await this.profileService.findById(dto.profileId);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    const message = Message.create({
      text: dto.text,
      profile: profile,
      chat: chat,
    });
    return await this.messageRepository.save(message);
  }

  async findByChat(dto: FindMessagesDto) {
    const messages = await this.messageRepository.findByChatId(dto.chatId);
    const profile = await this.profileService.findByChatIdAndUserId(dto);
    return {
      profileId: profile.id,
      messages: messages,
    };
  }
}
