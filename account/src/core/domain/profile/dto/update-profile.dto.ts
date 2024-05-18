import {
  ProfileInfo,
  ProfileVisible,
} from 'src/core/domain/profile/types/profile.types';
import { Tag } from 'src/core/domain/tag/entities/tag.entity';

export class UpdateProfileDto {
  tagsId: string[];
  info?: Partial<ProfileInfo>;
  visible?: ProfileVisible;
}

export class UpdateProfileEntityDto {
  tags: Tag[];
  info?: Partial<ProfileInfo>;
  visible?: ProfileVisible;
}
