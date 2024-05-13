import { Injectable } from '@nestjs/common';
import { User } from 'src/core/domain/user/entities/user.entity';
import { FindUserDto } from 'src/adapter/mappers/dto/find-user.dto';

@Injectable()
export class UserMapper {
  map(user: User): FindUserDto {
    return {
      id: user.id,
      telegramId: user.telegramId,
      username: user.username,
      phone: user.phone,
      birthdayDate: user.birthdayDate,
      gender: user.gender,
      profiles: [],
      createDate: user.createDate,
    };
  }
}
