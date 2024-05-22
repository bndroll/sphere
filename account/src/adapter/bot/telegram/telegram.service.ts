import { Inject, Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/core/domain/user/user.service';
import { AuthenticationService } from 'src/core/shared/iam/authentication/authentication.service';
import { generateString } from '@nestjs/typeorm';
import {
  ParseStartMessageResponseDto,
  StartMessageType,
} from 'src/adapter/bot/telegram/dto/start-prefix.dto';
import { User } from 'src/core/domain/user/entities/user.entity';

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

      const startMessage = this.parseStartMessage(msg.text);
      if (startMessage.type === StartMessageType.None) {
        await this.validateUserAndSave(msg);
      } else if (startMessage.type === StartMessageType.Sign) {
        const user = await this.validateUserAndSave(msg);
        if (startMessage.message) {
          const verifyCode = await this.authenticationService.saveSso({
            code: startMessage.message,
            userId: user.id,
          });

          return await this.bot.sendMessage(
            msg.from.id,
            'Для подтверждения аутентификации переходите по ссылке',
            {
              parse_mode: 'HTML',
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: 'Войти',
                      url: `${this.configService.get('WEB_APP_LINK')}/login/sso?verifyCode=${verifyCode}`,
                    },
                  ],
                ],
              },
            },
          );
        }
      } else if (startMessage.type === StartMessageType.Bind) {
        if (startMessage.message) {
          await this.authenticationService.verifyUserSso({
            code: startMessage.message,
            telegramId: String(msg.from.id),
          });

          return await this.bot.sendMessage(
            msg.from.id,
            'Вы успешно привязали аккаунт',
          );
        }
      }
    });
  }

  private parseStartMessage(message: string): ParseStartMessageResponseDto {
    switch (message.slice(7, 8)) {
      case 'b': {
        return {
          type: StartMessageType.Bind,
          message: message.slice(8).trim(),
        };
      }
      case 's': {
        return {
          type: StartMessageType.Sign,
          message: message.slice(8).trim(),
        };
      }
      default: {
        return {
          type: StartMessageType.None,
          message: message.slice(8).trim(),
        };
      }
    }
  }

  private async validateUserAndSave(msg: TelegramBot.Message): Promise<User> {
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
    }
    await this.sendStartMessage(String(msg.from.id));
    return user;
  }

  private async sendStartMessage(telegramId: string) {
    return await this.bot.sendMessage(
      telegramId,
      `Добро пожаловать в Sphere ! 
Здесь вы можете найти будущих партнеров, друзей, приятелей для хакатона  и людей, которые разделяют ваши увлечения. Начните свой путь с нами и откройте новые возможности для нетворкинга. 
Если у вас возникнут вопросы, обращайтесь в поддержку @bounderoll. 

Приятного использования приложения ! 
Команда Sphere`,
    );
  }
}
