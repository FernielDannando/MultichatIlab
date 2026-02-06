import { Server } from 'socket.io';

let io: Server;

export function initSocket(server: any) {
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', socket => {
    console.log('🟢 Cliente conectado:', socket.id);

    socket.on('join-chat', (chatId: string) => {
      socket.join(chatId);
      console.log(`📥 Socket ${socket.id} unido a chat ${chatId}`);
    });

    socket.on('disconnect', () => {
      console.log('🔴 Cliente desconectado:', socket.id);
    });
  });

  return io;
}

export function getIO(): Server {
  if (!io) {
    throw new Error('Socket.io no inicializado');
  }
  return io;
}
