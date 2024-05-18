import { Relation } from 'typeorm';
import { Profile } from 'src/core/domain/profile/entities/profile.entity';
import { UserGender } from 'src/core/domain/user/entities/user.entity';

export class FindUserResponse {
  id: string;
  telegramId: string | null;
  username: string;
  phone: string | null;
  birthdayDate: Date | null;
  gender: UserGender | null;
  profiles: Relation<Profile[]>;
  createDate: Date;
}
