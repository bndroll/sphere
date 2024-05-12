import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { BOT_AUTH_API_KEY } from '../telegram.constants';
import { UserBot } from 'src/adapter/bot/telegram/dto/user-bot.dto';
import * as TelegramBot from 'node-telegram-bot-api';

export const UserBotData = createParamDecorator(
  (key: keyof UserBot | undefined, ctx: ExecutionContext) => {
    const initData = ctx
      .switchToHttp()
      .getRequest()
      .header(BOT_AUTH_API_KEY) as string;
    const initDataParams = new URLSearchParams(initData);
    const userBot: TelegramBot.User = JSON.parse(initDataParams.get('user'));
    const userBotData = parseUserBotData(userBot);
    return key ? userBotData[key] : userBotData;
  },
);

export const parseUserBotData = (userBot: TelegramBot.User): UserBot => {
  const data = new UserBot();
  Object.keys(userBot).forEach((key) => {
    const newKey = key.replace(/(_\w)/g, (m) => m[1].toUpperCase());
    if (newKey !== 'id') {
      data[newKey] = userBot[key];
    }
  });
  data.telegramId = userBot.id;
  return data;
};
