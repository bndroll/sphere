import { Module } from '@nestjs/common';
import { UserClientModule } from './user-client/user-client.module';

@Module({
  imports: [UserClientModule],
})
export class ClientModule {}
