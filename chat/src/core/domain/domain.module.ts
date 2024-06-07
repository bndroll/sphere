import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [ChatModule, MessageModule, GatewayModule],
})
export class DomainModule {}
