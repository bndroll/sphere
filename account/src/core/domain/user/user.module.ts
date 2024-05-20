import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from 'src/core/domain/user/repositories/user.repository';
import { CommonModule } from 'src/core/common/common.module';
import { UserStorage } from 'src/core/domain/user/storages/user.storage';

@Module({
  imports: [CommonModule],
  providers: [UserService, UserRepository, UserStorage],
  exports: [UserService],
})
export class UserModule {}
