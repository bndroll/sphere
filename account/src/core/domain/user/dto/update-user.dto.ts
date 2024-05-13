import { UserGender } from 'src/core/domain/user/entities/user.entity';

export class UpdateUserDto {
  username?: string;
  phone?: string;
  birthdayDate?: Date;
  gender?: UserGender;
}

export class UpdateUserEntityDto {
  phone?: string;
  birthdayDate?: Date;
  gender?: UserGender;
}
