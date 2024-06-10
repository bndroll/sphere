import { Module } from '@nestjs/common';
import { GatewayGateway } from './gateway.gateway';
import { ChatModule } from 'src/core/domain/chat/chat.module';
import { MessageModule } from 'src/core/domain/message/message.module';
import { GatewaySessionManager } from 'src/core/domain/gateway/gateway.session';

@Module({
  imports: [ChatModule, MessageModule],
  providers: [GatewayGateway, GatewaySessionManager],
})
export class GatewayModule {}
