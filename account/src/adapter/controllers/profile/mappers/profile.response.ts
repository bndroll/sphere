import {
  ProfileInfo,
  ProfileType,
  ProfileVisible,
} from 'src/core/domain/profile/types/profile.types';

export class ProfileResponse {
  id: string;
  userId: string;
  categoryId: string;
  tags: string[];
  type: ProfileType;
  info: ProfileInfo;
  visible: ProfileVisible;
  updatedDate: Date;
  createDate: Date;
}
