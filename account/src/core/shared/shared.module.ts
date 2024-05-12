import { Module } from '@nestjs/common';
import { IamModule } from './iam/iam.module';
import { MessengerModule } from './messenger/messenger.module';

@Module({
  imports: [IamModule, MessengerModule],
})
export class SharedModule {}
