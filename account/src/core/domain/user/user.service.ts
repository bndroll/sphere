import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/core/domain/user/repositories/user.repository';
import { CreateUserDto } from 'src/core/domain/user/dto/create-user.dto';
import { User } from 'src/core/domain/user/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserDto) {
    const user = User.create({
      name: dto.name,
      password: dto.password,
      telegramId: dto.telegramId,
    });
    return await this.userRepository.save(user);
  }

  async findById(id: string) {
    return await this.userRepository.findByIdBR(id);
  }

  async findByName(name: string) {
    return await this.userRepository.findByName(name);
  }
}
