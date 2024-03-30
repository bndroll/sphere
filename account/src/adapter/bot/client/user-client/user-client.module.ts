import { Module } from '@nestjs/common';
import { UserClientController } from './user-client.controller';

@Module({
  controllers: [UserClientController],
})
export class UserClientModule {}
