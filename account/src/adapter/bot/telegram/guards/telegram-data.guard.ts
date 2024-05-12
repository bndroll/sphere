import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as CryptoJS from 'crypto-js';
import { ConfigService } from '@nestjs/config';
import { BOT_AUTH_API_KEY } from '../telegram.constants';
import { UserBot } from '../dto/user-bot.dto';

@Injectable()
export class TelegramDataGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const botToken = this.configService.get('TELEGRAM_BOT_TOKEN');
    if (!botToken) {
      return false;
    }

    const request: Request = context.switchToHttp().getRequest();
    const data = this.extractDataFromHeader(request);

    if (!data) {
      throw new UnauthorizedException();
    }

    const initData = new URLSearchParams(data);
    const hash = initData.get('hash');
    const user = initData.get('user');
    const dataToCheck: string[] = [];

    const parsedCustomerData: UserBot = JSON.parse(user);
    if (parsedCustomerData.isBot) {
      throw new BadRequestException();
    }

    initData.sort();
    initData.forEach(
      (item, key) => key !== 'hash' && dataToCheck.push(`${key}=${item}`),
    );

    const secret = CryptoJS.HmacSHA256(botToken, 'WebAppData');
    const _hash = CryptoJS.HmacSHA256(dataToCheck.join('\n'), secret).toString(
      CryptoJS.enc.Hex,
    );

    return hash === _hash;
  }

  private extractDataFromHeader(request: Request): string | undefined {
    return request.header(BOT_AUTH_API_KEY);
  }
}
