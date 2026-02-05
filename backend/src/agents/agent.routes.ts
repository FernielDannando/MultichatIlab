import { Router, Request, Response } from 'express';
import { agents } from './agent.store';
import { Agent } from './agent.model';
import { randomUUID } from 'crypto';

const router = Router();

/**
 * Crear agente
 */
router.post('/', (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Agent name is required' });
  }

  const agent: Agent = {
    id: randomUUID(),
    name,
    online: true,
  };

  agents.push(agent);

  res.status(201).json(agent);
});

/**
 * Listar agentes
 */
router.get('/', (_req: Request, res: Response) => {
  res.json(agents);
});

export default router;
