import { Injectable } from '@nestjs/common';
import {
  ChatContract,
  CreateChatContract,
} from 'src/core/domain/chat/contract/chat.contract';
import { HttpService } from '@nestjs/axios';
import { ChatRepository } from 'src/core/domain/chat/repositories/chat.repository';

@Injectable()
export class ChatService {
  constructor(
    private readonly httpService: HttpService,
    private readonly chatRepository: ChatRepository,
  ) {}

  async create(message: CreateChatContract.Message) {
    console.log('create chat topic received, data =', message);
    return null;
  }

  async addMember(message: ChatContract.Message) {
    console.log('add member to chat topic received, data =', message);
    return null;
  }

  async findById(id: string) {
    return await this.chatRepository.findOne({ where: { id: id } });
  }
}
