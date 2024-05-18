import {
  BadRequestException,
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

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
  ) {}

  async create(dto: CreateProfileDto): Promise<Profile> {
    const user = await this.userService.findById(dto.userId);
    if (!user) {
      throw new NotFoundException(UserErrorMessages.NotFound);
    }

    const category = await this.categoryService.findById(dto.categoryId);
    if (!category) {
      throw new NotFoundException(CategoryErrorMessages.NotFound);
    }

    if (dto.type === ProfileType.User) {
      const existingProfile =
        await this.profileRepository.findUserProfileByCategory({
          userId: dto.userId,
          categoryId: dto.categoryId,
        });

      if (!existingProfile) {
        throw new BadRequestException(ProfileErrorMessages.AlreadyExist);
      }
    }

    const tags = await this.tagService.findByIds(dto.tagsId);

    if ((tags.length === 0 || !dto.info.picture) && dto.visible) {
      throw new BadRequestException(ProfileErrorMessages.CannotBeVisible);
    }

    const profile = Profile.create({
      user: user,
      category: category,
      tags: tags,
      info: dto.info,
      type: dto.type,
      visible: ProfileVisible.Close,
    });
    return await this.profileRepository.save(profile);
  }

  async findByUser(userId: string) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(UserErrorMessages.NotFound);
    }
    return await this.profileRepository.findByUserId(user.id);
  }

  async remove(userId: string, id: string) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(UserErrorMessages.NotFound);
    }
    const profile = await this.profileRepository.findByIdBR(id);
    if (!profile) {
      throw new NotFoundException(ProfileErrorMessages.NotFound);
    }

    if (profile.user.id !== user.id) {
      throw new BadRequestException(ProfileErrorMessages.AccessDenied);
    }

    return await this.profileRepository.remove(profile);
  }

  /* todo:
   * update (visible, other fields)
   * remove
   *  */
}
