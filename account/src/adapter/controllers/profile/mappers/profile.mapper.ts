import { Injectable } from '@nestjs/common';
import { Profile } from 'src/core/domain/profile/entities/profile.entity';
import { ProfileResponse } from 'src/adapter/controllers/profile/mappers/profile.response';

@Injectable()
export class ProfileMapper {
  map(profile: Profile): ProfileResponse {
    return {
      id: profile.id,
      userId: profile.user.id,
      categoryId: profile.category.id,
      tags: profile.tags.map((tag) => tag.id),
      info: profile.info,
      type: profile.type,
      visible: profile.visible,
      updatedDate: profile.updatedDate,
      createDate: profile.createDate,
    };
  }
}
