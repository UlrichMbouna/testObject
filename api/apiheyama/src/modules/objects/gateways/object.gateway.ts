import { WebSocketGateway, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ObjectsGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('Gateway Socket.io Initialisée pour Heyama');
  }

  emitObjectCreated(object: any) {
    this.server.emit('objectCreated', object);
  }

  emitObjectDeleted(id: string) {
    this.server.emit('objectDeleted', id);
  }
}