import express from 'express';
import http from 'http';
import agentRoutes from './agents/agent.routes';
import chatRoutes from './chats/routes/chat.routes';
import messageRoutes from './chats/routes/message.routes';
import { initSocket } from './shared/socket';

const app = express();
const PORT = 3000;

const server = http.createServer(app);

app.use(express.json());

app.use('/agents', agentRoutes);
app.use('/chats', chatRoutes);
app.use('/chats', messageRoutes);

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'multichat-backend',
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (_req, res) => {
  res.send('Backend Multichat activo');
});

//Inicializar sockets UNA sola vez
initSocket(server);

// Escuchar UNA sola vez
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
