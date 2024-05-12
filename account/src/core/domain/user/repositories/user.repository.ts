import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from 'src/core/common/base.repository';
import { User } from 'src/core/domain/user/entities/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findByName(username: string) {
    return await this.createQueryBuilder('u')
      .where('u.username = :username', { username })
      .getOne();
  }

  async findByTelegramId(telegramId: string) {
    return await this.createQueryBuilder('u')
      .where('u.telegram_id = :telegramId', { telegramId })
      .getOne();
  }
}
