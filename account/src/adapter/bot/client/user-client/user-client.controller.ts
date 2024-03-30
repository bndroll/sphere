import { Controller } from '@nestjs/common';

@Controller('bot/user')
export class UserClientController {
  // constructor() {}
  //
  // @Get('photo/:id')
  // async getUserPhoto(@Res() res: Response, @Param('id') id: string) {
  //   const stream = await this.userService.getPhoto(id);
  //   res.set({ 'Content-Type': 'image/jpg' });
  //   stream.pipe(res);
  // }
  //
  // @Get('me')
  // @UseGuards(TelegramDataGuard)
  // async findMe(@UserBotData('telegramId') telegramId: number) {
  //   const userId =
  //     await this.userClientService.findUserIdByTelegramId(telegramId);
  //   const userInfo = await this.userService.findInfoById(userId);
  //   return this.userMapper.map(userInfo);
  // }
}
