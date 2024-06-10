import { Injectable } from '@nestjs/common';
import { WebSocket } from 'ws';

@Injectable()
export class GatewaySessionManager {
  private readonly sessions: Map<string, WebSocket> = new Map();

  getUserSocket(id: string) {
    return this.sessions.get(id);
  }

  setUserSocket(userId: string, socket: WebSocket) {
    this.sessions.set(userId, socket);
  }

  removeUserSocket(userId: string) {
    return this.sessions.delete(userId);
  }
}
