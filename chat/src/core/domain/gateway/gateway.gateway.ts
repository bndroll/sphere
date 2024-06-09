import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { GatewayService } from './gateway.service';
import { GatewaySessionManager } from 'src/core/domain/gateway/gateway.session';
import { Socket, Server } from 'socket.io';
import { ProfileService } from 'src/core/domain/chat/profile.service';
import { Logger } from '@nestjs/common';
import { CreateMessageContract } from 'src/core/domain/gateway/dto/create-message.dto';
import { ChatService } from 'src/core/domain/chat/chat.service';
import { MessageService } from 'src/core/domain/message/message.service';

@WebSocketGateway({ transports: ['websocket'], cors: true, path: '/wss' })
export class GatewayGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(GatewayGateway.name);

  constructor(
    private readonly gatewaySessionManager: GatewaySessionManager,
    private readonly gatewayService: GatewayService,
    private readonly profileService: ProfileService,
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket) {
    const userId = socket.request.headers['user-id'] as string;
    const userFromProfile = await this.profileService.checkUserExist(userId);
    if (userFromProfile) {
      this.gatewaySessionManager.setUserSocket(userId, socket);
      this.logger.verbose(`Connect websocket, userId: ${userId}`);
    }
  }

  async handleDisconnect(socket: Socket) {
    const userId = socket.request.headers['user-id'] as string;
    const deleted = this.gatewaySessionManager.removeUserSocket(userId);
    if (deleted) {
      this.logger.verbose(`Disconnect websocket, userId: ${userId}`);
    }
  }

  @SubscribeMessage(CreateMessageContract.topic)
  async create(@MessageBody() dto: CreateMessageContract.CreateMessageDto) {
    const chat = await this.chatService.findById(dto.chatId);

    const profilesFromChat = await this.profileService.findByChatId(dto.chatId);
    const profilesUsers = profilesFromChat.map((profile) => profile.userId);

    const message = await this.messageService.create({
      profileId: dto.profileId,
      chatId: chat.id,
      text: dto.text,
    });

    for (const userId of profilesUsers) {
      const userSocket = this.gatewaySessionManager.getUserSocket(userId);
      if (userSocket) {
        userSocket.emit('message.send', message);
      }
    }
  }
}
