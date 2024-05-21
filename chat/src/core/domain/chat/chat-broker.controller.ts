import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatService } from 'src/core/domain/chat/chat.service';
import {
  ChatContract,
  CreateChatContract,
} from 'src/core/domain/chat/contract/chat.contract';

@Controller()
export class SwipeBrokerController {
  constructor(private readonly chatService: ChatService) {}

  @MessagePattern(CreateChatContract.topic)
  async create(@Payload() message: CreateChatContract.Message) {
    await this.chatService.create(message);
  }

  @MessagePattern(ChatContract.topic)
  async addMember(@Payload() message: ChatContract.Message) {
    await this.chatService.addMember(message);
  }
}
