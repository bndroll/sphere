import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from 'src/core/domain/user/repositories/user.repository';
import { CommonModule } from 'src/core/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
