import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { AuthController } from 'src/adapter/controllers/auth.controller';
import { IamModule } from 'src/core/shared/iam/iam.module';
import { UserModule } from 'src/core/domain/user/user.module';
import { UserController } from 'src/adapter/controllers/user.controller';
import { UserMapper } from 'src/adapter/mappers/user.mapper';
import { SsoController } from 'src/adapter/controllers/sso.controller';

@Module({
  imports: [IamModule, UserModule, BotModule],
  providers: [UserMapper],
  controllers: [AuthController, UserController, SsoController],
})
export class AdapterModule {}
