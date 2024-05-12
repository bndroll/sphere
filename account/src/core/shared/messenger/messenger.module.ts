import { Module } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { botProviderWithoutPooling } from 'src/core/shared/messenger/messenger.provider';

@Module({
  providers: [MessengerService, botProviderWithoutPooling],
  exports: [MessengerService],
})
export class MessengerModule {}
