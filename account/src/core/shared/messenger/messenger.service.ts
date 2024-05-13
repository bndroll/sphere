import { Inject, Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MessengerService {
  constructor(
    @Inject('TELEGRAM_BOT') private readonly bot: TelegramBot,
    private readonly configService: ConfigService,
  ) {}

  async sendMessage() {}
}
