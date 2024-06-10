import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { GatewaySessionManager } from 'src/core/domain/gateway/gateway.session';
import { ProfileService } from 'src/core/domain/chat/profile.service';
import { Logger } from '@nestjs/common';
import { CreateMessageContract } from 'src/core/domain/gateway/dto/create-message.dto';
import { ChatService } from 'src/core/domain/chat/chat.service';
import { MessageService } from 'src/core/domain/message/message.service';
import { Server, WebSocket } from 'ws';

@WebSocketGateway({ transports: ['websocket'], cors: true, path: '/wss' })
export class GatewayGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(GatewayGateway.name);

  private clients: Map<WebSocket, string> = new Map();

  constructor(
    private readonly gatewaySessionManager: GatewaySessionManager,
    private readonly profileService: ProfileService,
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: WebSocket, req: Request) {
    const userId = req.url.split('=')[1].trim();
    const userFromProfile = await this.profileService.checkUserExist(userId);
    if (userFromProfile) {
      this.clients.set(socket, userId);
      this.gatewaySessionManager.setUserSocket(userId, socket);
      this.logger.verbose(`Connect websocket, userId: ${userId}`);

      socket.on('message', (message: string) => {
        this.handleMessage(
          JSON.parse(message) as CreateMessageContract.CreateMessageDto,
        );
      });
    }
  }

  async handleDisconnect(socket: WebSocket) {
    const userId = this.clients.get(socket);
    if (userId) {
      const deleted = this.gatewaySessionManager.removeUserSocket(userId);
      this.clients.delete(socket);
      if (deleted) {
        this.logger.verbose(`Disconnect websocket, userId: ${userId}`);
      }
    }
  }

  async handleMessage(dto: CreateMessageContract.CreateMessageDto) {
    try {
      const chat = await this.chatService.findById(dto.chatId);

      const profilesFromChat = await this.profileService.findByChatId(
        dto.chatId,
      );
      const profilesUsers = profilesFromChat.map((profile) => profile.userId);

      const message = await this.messageService.create({
        profileId: dto.profileId,
        chatId: chat.id,
        text: dto.text,
      });

      for (const userId of profilesUsers) {
        const userSocket = this.gatewaySessionManager.getUserSocket(userId);
        if (userSocket && userSocket.readyState === WebSocket.OPEN) {
          userSocket.send(JSON.stringify(message));
        }
      }
    } catch (err) {
      this.logger.error(
        'Error while handle message create',
        err?.message ?? '',
      );
    }
  }
}
