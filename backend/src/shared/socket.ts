import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';

let io: Server;

/**
 * Inicializa Socket.IO
 */
export function initSocket(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log('Cliente conectado:', socket.id);

    /**
     * Unirse a un chat (room)
     */
    socket.on('join-chat', (customerId: string) => {
      socket.join(customerId);
      console.log(`Socket ${socket.id} unido al chat ${customerId}`);
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });
}

/**
 * Emitir evento a un chat completo
 */
export function emitToChat(
  customerId: string,
  event: string,
  payload: any
) {
  if (!io) return;
  io.to(customerId).emit(event, payload);
}
