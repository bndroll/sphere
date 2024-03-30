import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { botProvider } from './telegram.provider';

@Module({
  providers: [TelegramService, botProvider],
})
export class TelegramModule {}
