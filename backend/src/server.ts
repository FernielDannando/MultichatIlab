import express, { Request, Response } from 'express';
import agentRoutes from './agents/agent.routes';
import chatRoutes from './chats/routes/chat.routes';
import http from 'http';
import { initSocket } from './shared/socket';

const app = express();
const PORT = 3000;

// 🔹 Crear servidor HTTP
const server = http.createServer(app);

// 🔹 Middlewares
app.use(express.json());
app.use('/agents', agentRoutes);
app.use('/chats', chatRoutes);

// 🔹 Inicializar sockets
initSocket(server);

// 🔹 Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'multichat-backend',
    timestamp: new Date().toISOString(),
  });
});

// 🔹 Root
app.get('/', (_req: Request, res: Response) => {
  res.send('Backend Multichat activo 🚀');
});

// 🔹 SOLO ESTE listen
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
