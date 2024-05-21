import { Module } from '@nestjs/common';
import { ChatController } from 'src/adapter/controllers/chat.controller';
import { ChatModule } from 'src/core/domain/chat/chat.module';

@Module({
  imports: [ChatModule],
  providers: [],
  controllers: [ChatController],
})
export class AdapterModule {}
