import express, { Request, Response } from 'express';
import agentRoutes from './agents/agent.routes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/agents', agentRoutes);


app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'multichat-backend',
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (_req: Request, res: Response) => {
  res.send('Backend Multichat activo 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
