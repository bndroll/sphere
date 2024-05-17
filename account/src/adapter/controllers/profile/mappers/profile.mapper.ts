import { Injectable } from '@nestjs/common';
import { Profile } from 'src/core/domain/profile/entities/profile.entity';

@Injectable()
export class ProfileMapper {
  map(profile: Profile) {}
}
