import { Chat } from '../models/chat.model';
import { randomUUID } from 'crypto';

/**
 * Store en memoria para chats
 * Key: customerId
 */
const chats = new Map<string, Chat>();

/**
 * Obtener un chat por customerId
 */
export function getChatByCustomer(customerId: string): Chat | undefined {
  return chats.get(customerId);
}

/**
 * Crear un chat nuevo
 */
export function createChat(customerId: string, customerName?: string): Chat {
  const now = new Date();

  const chat: Chat = {
    id: randomUUID(),
    customerId,
    customerName,
    assignedAgents: [],
    messages: [],
    createdAt: now,
    lastActivityAt: now,
  };

  chats.set(customerId, chat);
  return chat;
}

/**
 * Obtener o crear chat
 */
export function getOrCreateChat(
  customerId: string,
  customerName?: string
): Chat {
  const existing = getChatByCustomer(customerId);
  if (existing) {
    return existing;
  }

  return createChat(customerId, customerName);
}

/**
 * Listar todos los chats
 */
export function listChats(): Chat[] {
  return Array.from(chats.values()).sort(
    (a, b) => b.lastActivityAt.getTime() - a.lastActivityAt.getTime()
  );
}
