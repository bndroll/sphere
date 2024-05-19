import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Profile } from 'src/core/domain/profile/entities/profile.entity';
import { CreateProfileDto } from 'src/core/domain/profile/dto/create-profile.dto';
import { UserService } from 'src/core/domain/user/user.service';
import { UserErrorMessages } from 'src/core/domain/user/user.constants';
import { CategoryService } from 'src/core/domain/category/category.service';
import { CategoryErrorMessages } from 'src/core/domain/category/category.constants';
import { ProfileErrorMessages } from 'src/core/domain/profile/profile.constants';
import { ProfileRepository } from 'src/core/domain/profile/repositories/profile.repository';
import {
  ProfileType,
  ProfileVisible,
} from 'src/core/domain/profile/types/profile.types';
import { TagService } from 'src/core/domain/tag/tag.service';
import { UpdateProfileDto } from 'src/core/domain/profile/dto/update-profile.dto';
import { ConfigService } from '@nestjs/config';
import { FindByIdsDto } from 'src/core/domain/profile/dto/find-by-ids.dto';
import { Producer } from 'kafkajs';
import { SetProfileContract } from 'src/core/domain/profile/contracts/set-profile.contract';
import { DeleteProfileContract } from 'src/core/domain/profile/contracts/delete-profile.contract';

@Injectable()
export class ProfileService {
  constructor(
    @Inject('KAFKA_PROFILE_PRODUCER') private readonly producer: Producer,
    private readonly profileRepository: ProfileRepository,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
    private readonly configService: ConfigService,
  ) {}

  async create(userId: string, dto: CreateProfileDto): Promise<Profile> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(UserErrorMessages.NotFound);
    }

    const category = await this.categoryService.findById(dto.categoryId);
    if (!category) {
      throw new NotFoundException(CategoryErrorMessages.NotFound);
    }

    if (!dto.info.name) {
      throw new BadRequestException();
    }

    const tags = dto.tagsId ? await this.tagService.findByIds(dto.tagsId) : [];

    if (dto.type === ProfileType.User) {
      const lastUserProfile =
        await this.profileRepository.findLastUserProfileByUserId({
          userId: user.id,
        });

      if (lastUserProfile && lastUserProfile.category.id === category.id) {
        throw new BadRequestException(ProfileErrorMessages.AlreadyExist);
      }
    } else {
      const eventsCount =
        await this.profileRepository.userEventsCountByCategory({
          categoryId: category.id,
          userId: user.id,
        });
      if (
        eventsCount >
        this.configService.get('MAX_USER_EVENTS_BY_CATEGORY_COUNT')
      ) {
        throw new BadRequestException(ProfileErrorMessages.MaxEventsCount);
      }
    }

    const profile = Profile.create({
      user: user,
      category: category,
      tags: tags,
      info: dto.info,
      type: dto.type,
      visible:
        tags.length > 0 &&
        dto.info.picture &&
        dto.visible === ProfileVisible.Open
          ? ProfileVisible.Open
          : ProfileVisible.Close,
    });
    const savedProfile = await this.profileRepository.save(profile);
    await this.producer.send({
      topic: SetProfileContract.topic,
      messages: [{ value: JSON.stringify(savedProfile) }],
    });
    return savedProfile;
  }

  async findByUser(userId: string) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(UserErrorMessages.NotFound);
    }
    return await this.profileRepository.findByUserId(user.id);
  }

  async findByIds(dto: FindByIdsDto) {
    return await this.profileRepository.findProfilesByIds(dto);
  }

  async update(id: string, userId: string, dto: UpdateProfileDto) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(UserErrorMessages.NotFound);
    }
    const profile = await this.profileRepository.findFullById(id);
    if (!profile) {
      throw new NotFoundException(ProfileErrorMessages.NotFound);
    }

    if (profile.user.id !== user.id) {
      throw new BadRequestException(ProfileErrorMessages.AccessDenied);
    }

    const tags = await this.tagService.findByIds(dto.tagsId);

    if (
      (tags.length === 0 || !dto.info.picture) &&
      dto.visible === ProfileVisible.Open
    ) {
      throw new BadRequestException(ProfileErrorMessages.CannotBeVisible);
    }

    profile.update({ tags: tags, info: dto.info, visible: dto.visible });
    const savedProfile = await this.profileRepository.save(profile);
    await this.producer.send({
      topic: SetProfileContract.topic,
      messages: [{ value: JSON.stringify(savedProfile) }],
    });
    return savedProfile;
  }

  async remove(id: string, userId: string) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(UserErrorMessages.NotFound);
    }
    const profile = await this.profileRepository.findFullById(id);
    if (!profile) {
      throw new NotFoundException(ProfileErrorMessages.NotFound);
    }

    if (profile.user.id !== user.id) {
      throw new BadRequestException(ProfileErrorMessages.AccessDenied);
    }

    const removedProfile = await this.profileRepository.remove(profile);
    await this.producer.send({
      topic: DeleteProfileContract.topic,
      messages: [{ value: JSON.stringify({ id: removedProfile.id }) }],
    });
    return removedProfile;
  }
}
