import { User } from 'src/core/domain/user/entities/user.entity';
import { Category } from 'src/core/domain/category/entities/category.entity';
import { Tag } from 'src/core/domain/tag/entities/tag.entity';
import {
  ProfileInfo,
  ProfileType,
  ProfileVisible,
} from 'src/core/domain/profile/types/profile.types';

export class CreateProfileDto {
  categoryId: string;
  tagsId: string[];
  type: ProfileType;
  info: ProfileInfo;
  visible: ProfileVisible;
}

export class CreateProfileEntityDto {
  user: User;
  category: Category;
  tags: Tag[];
  type: ProfileType;
  info: ProfileInfo;
  visible: ProfileVisible;
}
