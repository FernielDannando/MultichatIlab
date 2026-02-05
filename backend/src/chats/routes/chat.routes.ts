import { Router, Request, Response } from 'express';
import {
  getOrCreateChat,
  getChatByCustomer,
  listChats,
} from '../stores/chat.store';

const router = Router();

/**
 * Crear u obtener chat
 */
router.post('/', (req: Request, res: Response) => {
  const { customerId, customerName } = req.body;

  if (!customerId) {
    return res.status(400).json({ error: 'customerId is required' });
  }

  const chat = getOrCreateChat(customerId, customerName);
  res.status(201).json(chat);
});

/**
 * Obtener chat por customerId
 */
router.get('/:customerId', (req: Request, res: Response) => {
  const { customerId } = req.params;

  if (typeof customerId !== 'string') {
    return res.status(400).json({ error: 'Invalid customerId' });
  }

  const chat = getChatByCustomer(customerId);

  if (!chat) {
    return res.status(404).json({ error: 'Chat not found' });
  }

  res.json(chat);
});


/**
 * Listar todos los chats
 */
router.get('/', (_req: Request, res: Response) => {
  res.json(listChats());
});

export default router;
