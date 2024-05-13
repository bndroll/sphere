import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { ConfigService } from '@nestjs/config';
import TelegramBot from 'node-telegram-bot-api';

export const botProviderWithoutPooling: Provider = {
  provide: 'TELEGRAM_BOT',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return new TelegramBot(configService.get('TELEGRAM_BOT_TOKEN'), {
      polling: false,
    });
  },
};
