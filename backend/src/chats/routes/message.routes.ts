import { Router, Request, Response } from 'express';
import { addMessageToChat } from '../stores/chat.store';

const router = Router();

/**
 * Enviar mensaje a un chat
 */
router.post('/:customerId/messages', (req: Request, res: Response) => {

  const customerId = req.params.customerId as string;
  const { senderType, senderId, content } = req.body;

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

  res.status(201).json(message);
});

export default router;
