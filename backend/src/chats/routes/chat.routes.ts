import { Router, Request, Response } from 'express';
import {
  getOrCreateChat,
  getChatByCustomer,
  listChats,
} from '../stores/chat.store';
import { autoAssignAgent } from '../stores/chat.store';


const router = Router();

/**
 * Listar todos los chats
 */
router.get('/', (_req: Request, res: Response) => {
  res.json(listChats());
});

/**
 * Obtener chat por customerId
 */
router.get('/:customerId', (req: Request, res: Response) => {
  const customerId = req.params.customerId as string;

  const chat = getChatByCustomer(customerId);

  if (!chat) {
    return res.status(404).json({ error: 'Chat not found' });
  }

  res.json(chat);
});

/**
 * Crear u obtener chat
 */
router.post('/', (req: Request, res: Response) => {
  const { customerId, customerName } = req.body;

  if (!customerId) {
    return res.status(400).json({ error: 'customerId is required' });
  }

  const existing = getChatByCustomer(customerId);
  const chat = getOrCreateChat(customerId, customerName);
  autoAssignAgent(customerId);

  res.status(existing ? 200 : 201).json(chat);
});

export default router;
