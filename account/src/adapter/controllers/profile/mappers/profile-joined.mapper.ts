import { Injectable } from '@nestjs/common';
import { Profile } from 'src/core/domain/profile/entities/profile.entity';
import { ProfileJoinedResponse } from 'src/adapter/controllers/profile/mappers/profile-joined.response';

@Injectable()
export class ProfileJoinedMapper {
  map(profile: Profile): ProfileJoinedResponse {
    return {
      id: profile.id,
      type: profile.type,
      info: profile.info,
      visible: profile.visible,
      user: {
        id: profile.user.id,
        telegramId: profile.user.telegramId,
        username: profile.user.username,
        phone: profile.user.phone,
        gender: profile.user.gender,
        birthdayDate: profile.user.birthdayDate,
        createDate: profile.user.createDate,
      },
      category: profile.category,
      tags: profile.tags,
      createDate: profile.createDate,
      updatedDate: profile.updatedDate,
    };
  }
}
