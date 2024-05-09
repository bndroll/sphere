import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/core/domain/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/core/domain/user/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
