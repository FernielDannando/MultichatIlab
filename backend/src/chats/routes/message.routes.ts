import { Router, Request, Response } from 'express';
import { addMessageToChat } from '../stores/chat.store';
import { emitToChat } from '../../shared/socket';

const router = Router();

/**
 * Enviar mensaje a un chat
 * POST /chats/:customerId/messages
 */
router.post('/:customerId/messages', (req: Request, res: Response) => {

  const customerId = req.params.customerId as string; 
  const { senderType, senderId, content } = req.body;

  // Validaciones básicas
  if (!senderType || !senderId || !content) {
    return res.status(400).json({
      error: 'senderType, senderId and content are required',
    });
  }

  if (senderType !== 'customer' && senderType !== 'agent') {
    return res.status(400).json({
      error: 'senderType must be customer or agent',
    });
  }

  const message = addMessageToChat(
    customerId,
    senderType,
    senderId,
    content
  );

  if (!message) {
    return res.status(404).json({ error: 'Chat not found' });
  }

  emitToChat(customerId, 'new-message', message);

  return res.status(201).json(message);
});

export default router;
