import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { AuthController } from 'src/adapter/controllers/auth.controller';
import { IamModule } from 'src/core/shared/iam/iam.module';
import { UserModule } from 'src/core/domain/user/user.module';
import { UserController } from 'src/adapter/controllers/user/user.controller';
import { UserMapper } from 'src/adapter/controllers/user/mappers/user.mapper';
import { SsoController } from 'src/adapter/controllers/sso.controller';
import { ProfileController } from 'src/adapter/controllers/profile/profile.controller';
import { ProfileMapper } from 'src/adapter/controllers/profile/mappers/profile.mapper';
import { ProfileModule } from 'src/core/domain/profile/profile.module';
import { S3Module } from 'src/s3/s3.module';
import { S3Controller } from 'src/adapter/controllers/s3.controller';

@Module({
  imports: [IamModule, UserModule, ProfileModule, BotModule, S3Module],
  providers: [UserMapper, ProfileMapper],
  controllers: [
    AuthController,
    UserController,
    SsoController,
    ProfileController,
    S3Controller,
  ],
})
export class AdapterModule {}
