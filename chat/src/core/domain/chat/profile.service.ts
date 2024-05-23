import { Injectable } from '@nestjs/common';
import {
  ChatContract,
  CreateChatContract,
} from 'src/core/domain/chat/contract/chat.contract';
import { FindProfileRequest } from 'src/core/domain/chat/dto/find-profiles.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { ProfileRepository } from 'src/core/domain/chat/repositories/profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    private readonly httpService: HttpService,
    private readonly profileRepository: ProfileRepository,
  ) {}

  async create(message: CreateChatContract.Message) {}

  async addMember(message: ChatContract.Message) {}

  async findById(id: string) {
    return await this.profileRepository.findOne({ where: { id } });
  }

  async findChats(id: string) {
    return await this.profileRepository.findChats(id);
  }

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
