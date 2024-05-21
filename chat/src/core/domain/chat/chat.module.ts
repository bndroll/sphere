import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { SwipeBrokerController } from 'src/core/domain/chat/chat-broker.controller';
import { HttpModule } from '@nestjs/axios';
import { CommonModule } from 'src/core/common/common.module';

@Module({
  imports: [CommonModule, HttpModule],
  controllers: [SwipeBrokerController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
