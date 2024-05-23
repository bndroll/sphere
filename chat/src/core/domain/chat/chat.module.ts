import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { SwipeBrokerController } from 'src/core/domain/chat/chat-broker.controller';
import { HttpModule } from '@nestjs/axios';
import { CommonModule } from 'src/core/common/common.module';
import { ProfileService } from 'src/core/domain/chat/profile.service';
import { ChatRepository } from 'src/core/domain/chat/repositories/chat.repository';
import { ProfileRepository } from 'src/core/domain/chat/repositories/profile.repository';

@Module({
  imports: [CommonModule, HttpModule],
  controllers: [SwipeBrokerController],
  providers: [ChatService, ProfileService, ChatRepository, ProfileRepository],
  exports: [ChatService, ProfileService],
})
export class ChatModule {}
