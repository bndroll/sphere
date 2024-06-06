import { BadRequestException, Injectable } from '@nestjs/common';
import { FindProfileRequest } from 'src/core/domain/chat/dto/find-profiles.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { ProfileRepository } from 'src/core/domain/chat/repositories/profile.repository';
import { CreateProfileDto } from 'src/core/domain/chat/dto/create-profile.dtp';
import { Profile } from 'src/core/domain/chat/entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    private readonly httpService: HttpService,
    private readonly profileRepository: ProfileRepository,
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
        info: {
          name: accountProfile.info.name,
          avatar: accountProfile.info.picture,
        },
      }),
    );
  }

  async addMember() {}

  async findById(id: string) {
    return await this.profileRepository.findByIdBR(id);
  }

  async findByProfileId(profileId: string) {
    return await this.profileRepository.findByProfileId(profileId);
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
