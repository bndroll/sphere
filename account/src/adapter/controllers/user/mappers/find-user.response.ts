import { UserGender } from 'src/core/domain/user/entities/user.entity';

export class FindUserResponse {
  id: string;
  telegramId: string | null;
  username: string;
  phone: string | null;
  birthdayDate: Date | null;
  gender: UserGender | null;
  createDate: Date;
}
