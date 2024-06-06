import { ProfileInfo } from 'src/core/domain/chat/entities/profile.entity';

export class CreateProfileDto {
  profileId: string;
}

export class CreateProfileEntityDto {
  profileId: string;
  info: ProfileInfo;
}
