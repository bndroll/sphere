import { Injectable, Logger } from '@nestjs/common';
import {
  ChatContract,
  CreateChatContract,
  ProfileType,
} from 'src/core/domain/chat/contract/chat.contract';
import { HttpService } from '@nestjs/axios';
import { ChatRepository } from 'src/core/domain/chat/repositories/chat.repository';
import { ProfileService } from 'src/core/domain/chat/profile.service';
import { Chat, ChatType } from 'src/core/domain/chat/entities/chat.entity';
import { ProfileRepository } from 'src/core/domain/chat/repositories/profile.repository';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly chatRepository: ChatRepository,
    private readonly profileService: ProfileService,
    private readonly profileRepository: ProfileRepository,
  ) {}

  async create(dto: CreateChatContract.Message) {
    if (dto.type === ProfileType.Event) {
      const existingChat = await this.chatRepository.findByProfileId(
        dto.profileId,
      );
      if (existingChat) {
        this.logger.warn('Event chat group already exist for this profile');
        return;
      }

      let existingProfile = await this.profileService.findByProfileId(
        dto.profileId,
      );
      if (!existingProfile) {
        existingProfile = await this.profileService.create({
          profileId: dto.profileId,
        });
      }

      const chat = await this.chatRepository.save(
        Chat.create({
          type: ChatType.Group,
          name: existingProfile.info.name,
          profiles: [existingProfile],
        }),
      );

      existingProfile.updateAddChat(chat);
      await this.profileRepository.save(existingProfile);
    } else if (dto.type === ProfileType.User) {
      const existingChat =
        await this.chatRepository.findByProfileIdAndProfileRecId(
          dto.profileId,
          dto.profileSecondId,
        );
      if (existingChat) {
        this.logger.warn('User chat already exist for this profiles');
        return;
      }

      let existingProfile = await this.profileService.findByProfileId(
        dto.profileId,
      );
      let existingSecondProfile = await this.profileService.findByProfileId(
        dto.profileSecondId,
      );
      if (!existingProfile) {
        existingProfile = await this.profileService.create({
          profileId: dto.profileId,
        });
      }
      if (!existingSecondProfile) {
        existingSecondProfile = await this.profileService.create({
          profileId: dto.profileSecondId,
        });
      }

      const chat = await this.chatRepository.save(
        Chat.create({
          type: ChatType.Single,
          profiles: [existingProfile, existingSecondProfile],
        }),
      );

      existingProfile.updateAddChat(chat);
      existingSecondProfile.updateAddChat(chat);
      await this.profileRepository.save(existingProfile);
      await this.profileRepository.save(existingSecondProfile);
    }
  }

  async addMember(message: ChatContract.Message) {
    console.log('add member to chat topic received, data =', message);
    return null;
  }

  async findById(id: string) {
    return await this.chatRepository.findOne({ where: { id: id } });
  }
}
