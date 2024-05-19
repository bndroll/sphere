import { Injectable } from '@nestjs/common';
import { User } from 'src/core/domain/user/entities/user.entity';
import { FindUserResponse } from 'src/adapter/controllers/user/mappers/find-user.response';

@Injectable()
export class UserMapper {
  map(user: User): FindUserResponse {
    return {
      id: user.id,
      telegramId: user.telegramId,
      username: user.username,
      phone: user.phone,
      birthdayDate: user.birthdayDate,
      gender: user.gender,
      createDate: user.createDate,
    };
  }
}
