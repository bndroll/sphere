import { Module } from '@nestjs/common';
import { TelegramModule } from './telegram/telegram.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [TelegramModule, ClientModule],
})
export class BotModule {}
