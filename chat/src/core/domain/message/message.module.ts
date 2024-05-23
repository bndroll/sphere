import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageRepository } from 'src/core/domain/message/repositories/message.repository';
import { ChatModule } from 'src/core/domain/chat/chat.module';

@Module({
  imports: [ChatModule],
  providers: [MessageService, MessageRepository],
  exports: [MessageService],
})
export class MessageModule {}
