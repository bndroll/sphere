import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/core/domain/user/repositories/user.repository';
import { CreateUserDto } from 'src/core/domain/user/dto/create-user.dto';
import { User } from 'src/core/domain/user/entities/user.entity';
import { UpdateUserPasswordDto } from 'src/core/domain/user/dto/update-user-password.dto';
import { UpdateUserDto } from 'src/core/domain/user/dto/update-user.dto';
import { UserErrorMessages } from 'src/core/domain/user/user.constants';
import { UsernameAlreadyExistException } from 'src/core/domain/user/exceptions/username-already-exist';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {
  }

  async create(dto: CreateUserDto) {
    const oldUser = await this.userRepository.findByName(dto.username);
    if (oldUser) {
      throw new UsernameAlreadyExistException();
    }

    const user = User.create({
      username: dto.username,
      password: dto.password,
      telegramId: dto.telegramId,
    });
    return await this.userRepository.save(user);
  }

  async findById(id: string) {
    return await this.userRepository.findByIdBR(id);
  }

  async findByName(username: string) {
    return await this.userRepository.findByName(username);
  }

  async findByTelegramId(telegramId: string) {
    return await this.userRepository.findByTelegramId(telegramId);
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findByIdBR(id);
    if (!user) {
      throw new NotFoundException(UserErrorMessages.UserNotFound);
    }

    if (dto.username && dto.username !== user.username) {
      const oldUser = await this.userRepository.findByName(dto.username);
      if (oldUser) {
        throw new UsernameAlreadyExistException();
      }
      user.updateUsername(dto.username);
    }

    user.update({
      phone: dto.phone,
      birthdayDate: dto.birthdayDate,
      gender: dto.gender,
    });

    return await this.userRepository.save(user);
  }

  async updatePassword(id: string, dto: UpdateUserPasswordDto) {
    const user = await this.userRepository.findByIdBR(id);
    if (!user) {
      throw new NotFoundException(UserErrorMessages.UserNotFound);
    }
    user.updatePassword(dto.newPassword);
    return await this.userRepository.save(user);
  }
}
