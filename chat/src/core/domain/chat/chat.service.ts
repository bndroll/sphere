import { Injectable } from '@nestjs/common';
import {
  ChatContract,
  CreateChatContract,
} from 'src/core/domain/chat/contract/chat.contract';
import { FindProfileRequest } from 'src/core/domain/chat/dto/find-profiles.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class ChatService {
  constructor(private readonly httpService: HttpService) {}

  async create(message: CreateChatContract.Message) {}

  async addMember(message: ChatContract.Message) {}

  async findProfiles(ids: string[]) {
    return await this.httpService.axiosRef
      .post<
        FindProfileRequest[],
        AxiosResponse<FindProfileRequest[]>,
        { ids: string[] }
      >(`${process.env.ACCOUNT_SERVICE_URL}/profile/find-by-ids`, {
        ids: ids,
      })
      .then((r) => r.data);
  }
}
