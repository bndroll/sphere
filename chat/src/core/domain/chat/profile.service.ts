import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { FindProfileRequest } from 'src/core/domain/chat/dto/find-profiles.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { ProfileRepository } from 'src/core/domain/chat/repositories/profile.repository';
import { CreateProfileDto } from 'src/core/domain/chat/dto/create-profile.dtp';
import { Profile } from 'src/core/domain/chat/entities/profile.entity';
import { ChatRepository } from 'src/core/domain/chat/repositories/chat.repository';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly profileRepository: ProfileRepository,
    private readonly chatRepository: ChatRepository,
  ) {}

  async create(dto: CreateProfileDto) {
    const existingProfile = await this.profileRepository.findByProfileId(
      dto.profileId,
    );
    if (existingProfile) {
      return existingProfile;
    }

    const accountProfile = await this.findProfiles([dto.profileId]).then(
      (r) => r[0],
    );
    if (!accountProfile) {
      throw new BadRequestException('Account profile does not exist');
    }

    return await this.profileRepository.save(
      Profile.create({
        profileId: dto.profileId,
        userId: accountProfile.user.id,
        info: {
          name: accountProfile.info.name,
          avatar: accountProfile.info.picture,
        },
      }),
    );
  }

  async findById(id: string) {
    return await this.profileRepository.findByIdBR(id);
  }

  async findByProfileId(profileId: string) {
    return await this.profileRepository.findByProfileId(profileId);
  }

  async findChats(userId: string) {
    return await this.chatRepository.findByUserId(userId);
  }

  async checkUserExist(userId: string) {
    try {
      const profile = await this.profileRepository.findByUserId(userId);
      return !!profile;
    } catch (error) {
      this.logger.warn('Error while checking user exist');
      return false;
    }
  }

  async findByChatId(chatId: string): Promise<Profile[]> {
    return await this.profileRepository.findByChatId(chatId);
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
