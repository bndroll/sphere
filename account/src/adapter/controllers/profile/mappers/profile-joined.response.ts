import {
  ProfileInfo,
  ProfileType,
  ProfileVisible,
} from 'src/core/domain/profile/types/profile.types';
import { Tag } from 'src/core/domain/tag/entities/tag.entity';
import { Category } from 'src/core/domain/category/entities/category.entity';
import { FindUserResponse } from 'src/adapter/controllers/user/mappers/find-user.response';

export class ProfileJoinedResponse {
  id: string;
  type: ProfileType;
  info: ProfileInfo;
  visible: ProfileVisible;
  user: FindUserResponse;
  category: Category;
  tags: Tag[];
  updatedDate: Date;
  createDate: Date;
}
