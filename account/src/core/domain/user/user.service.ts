import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/core/domain/user/repositories/user.repository';
import { CreateUserDto } from 'src/core/domain/user/dto/create-user.dto';
import { User } from 'src/core/domain/user/entities/user.entity';
import { UpdateUserPasswordDto } from 'src/core/domain/user/dto/update-user-password.dto';
import { UpdateUserDto } from 'src/core/domain/user/dto/update-user.dto';
import { UserErrorMessages } from 'src/core/domain/user/user.constants';
import { UsernameAlreadyExistException } from 'src/core/domain/user/exceptions/username-already-exist';
import { Producer } from 'kafkajs';
import { SetUserContract } from 'src/core/domain/user/contracts/set-user.contract';
import { UserStorage } from 'src/core/domain/user/storages/user.storage';

@Injectable()
export class UserService {
  constructor(
    @Inject('KAFKA_USER_PRODUCER') private readonly producer: Producer,
    private readonly userRepository: UserRepository,
    private readonly userStorage: UserStorage,
  ) {}

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
    const savedUser = await this.userRepository.save(user);
    await this.userStorage.insert(user);
    await this.producer.send({
      topic: SetUserContract.topic,
      messages: [{ value: JSON.stringify(savedUser) }],
    });
    return savedUser;
  }

  async findById(id: string) {
    const cachedUser = await this.userStorage.get(id);
    if (!cachedUser) {
      const user = await this.userRepository.findByIdBR(id);
      if (!user) {
        return null;
      }
      await this.userStorage.insert(user);
      return user;
    }
    return cachedUser;
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
      throw new NotFoundException(UserErrorMessages.NotFound);
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
    const savedUser = await this.userRepository.save(user);
    await this.userStorage.insert(savedUser);
    await this.producer.send({
      topic: SetUserContract.topic,
      messages: [{ value: JSON.stringify(savedUser) }],
    });
    return savedUser;
  }

  async updatePassword(id: string, dto: UpdateUserPasswordDto) {
    const user = await this.userRepository.findByIdBR(id);
    if (!user) {
      throw new NotFoundException(UserErrorMessages.NotFound);
    }
    user.updatePassword(dto.newPassword);
    const savedUser = await this.userRepository.save(user);
    await this.userStorage.insert(savedUser);
    await this.producer.send({
      topic: SetUserContract.topic,
      messages: [{ value: JSON.stringify(savedUser) }],
    });
    return savedUser;
  }

  async updateTelegramId(id: string, telegramId: string) {
    const user = await this.userRepository.findByIdBR(id);
    if (!user) {
      throw new NotFoundException(UserErrorMessages.NotFound);
    }
    user.updateTelegramId(telegramId);
    const savedUser = await this.userRepository.save(user);
    await this.userStorage.insert(savedUser);
    await this.producer.send({
      topic: SetUserContract.topic,
      messages: [{ value: JSON.stringify(savedUser) }],
    });
    return savedUser;
  }
}
