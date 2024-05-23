import { Module } from '@nestjs/common';
import { ChatController } from 'src/adapter/controllers/chat.controller';
import { ChatModule } from 'src/core/domain/chat/chat.module';
import { MessageModule } from 'src/core/domain/message/message.module';

@Module({
  imports: [ChatModule, MessageModule],
  providers: [],
  controllers: [ChatController],
})
export class AdapterModule {}
