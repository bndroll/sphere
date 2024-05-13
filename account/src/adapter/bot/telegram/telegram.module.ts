import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { botProvider } from './telegram.provider';
import { UserModule } from 'src/core/domain/user/user.module';
import { IamModule } from 'src/core/shared/iam/iam.module';

@Module({
  imports: [UserModule, IamModule],
  providers: [TelegramService, botProvider],
})
export class TelegramModule {}
