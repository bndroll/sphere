import { Inject, Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/core/domain/user/user.service';
import { AuthenticationService } from 'src/core/shared/iam/authentication/authentication.service';
import { generateString } from '@nestjs/typeorm';

@Injectable()
export class TelegramService {
  constructor(
    @Inject('TELEGRAM_BOT') private readonly bot: TelegramBot,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly authenticationService: AuthenticationService,
  ) {
    this.subscribeAll();
  }

  async subscribeAll() {
    await this.subscribeStart();
  }

  async subscribeStart() {
    this.bot.onText(/^\/start(\s.*|$)/, async (msg) => {
      if (msg.from.is_bot) {
        return;
      }

      let user = await this.userService.findByTelegramId(String(msg.from.id));
      if (!user) {
        const usernameExist = msg.from.username
          ? await this.userService.findByName(msg.from.username)
          : null;

        user = await this.authenticationService.signUp({
          username:
            usernameExist || !msg.from.username
              ? generateString()
              : msg.from.username,
          telegramId: String(msg.from.id),
        });
      } else {
        user.updateTelegramId(String(msg.from.id));
      }

      const code = this.parseStartMessage(msg.text);
      if (code) {
        const verifyCode = await this.authenticationService.saveSso({
          code: code,
          userId: user.id,
        });
        const link = `${this.configService.get('WEB_APP_LINK')}/login/sso?verifyCode=${verifyCode}`;

        return await this.bot.sendMessage(
          msg.from.id,
          'Привет! Я бот приложения sphere, заходите и веселись )',
          {
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [[{ text: 'Войти', url: `${link}` }]],
            },
          },
        );
      }

      return await this.bot.sendMessage(
        msg.from.id,
        'Привет! Я бот приложения sphere, заходите и веселись )',
      );
    });
  }

  private parseStartMessage(message: string) {
    return message.slice(6).trim();
  }
}
