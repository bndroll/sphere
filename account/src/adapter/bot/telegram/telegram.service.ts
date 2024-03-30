import { Inject, Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramService {
  constructor(
    @Inject('TELEGRAM_BOT') private readonly bot: TelegramBot,
    private readonly configService: ConfigService,
  ) {
    // this.subscribeAll();
  }

  // async subscribeAll() {
  //   await this.subscribeStart();
  //   await this.subscribeContact();
  // }
  //
  // async subscribeStart() {
  //   this.bot.onText(/^\/start(\s.*|$)/, async (msg) => {
  //     if (msg.from.is_bot) {
  //       return;
  //     }
  //
  //     const userBot = parseUserBotData(msg.from);
  //     const newUser = new CreateUserDto(userBot);
  //
  //     const startMessage = this.parseStartMessage(msg.text);
  //     if (startMessage) {
  //       newUser.setReferenceUserId(startMessage);
  //     }
  //
  //     const user = await this.userService.create(newUser);
  //     return await this.bot.sendMessage(
  //       msg.from.id,
  //       TelegramMessages.startMessageWithName(user?.name),
  //     );
  //   });
  // }
  //
  // async subscribeContact() {
  //   this.bot.on('contact', async (msg) => {
  //     if (msg.from.is_bot) {
  //       return;
  //     }
  //
  //     await this.userService.updateContact({
  //       telegramId: msg.from.id,
  //       phone: msg.contact.phone_number,
  //     });
  //
  //     return await this.bot.sendMessage(
  //       msg.from.id,
  //       TelegramMessages.shareContact(),
  //     );
  //   });
  // }

  private parseStartMessage(message: string) {
    return message.slice(6).trim();
  }
}
