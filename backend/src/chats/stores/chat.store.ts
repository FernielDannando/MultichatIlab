import { Chat, Message } from '../models/chat.model';
import { randomUUID } from 'crypto';
import { agents, getOnlineAgents } from '../../agents/agent.store';

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
 * → Auto-asigna un agente si hay alguno online
 */
export function createChat(
  customerId: string,
  customerName?: string
): Chat {
  const now = new Date();

  const onlineAgents = getOnlineAgents();
  const assignedAgents =
    onlineAgents.length > 0 ? [onlineAgents[0].id] : [];

  const chat: Chat = {
    id: randomUUID(),
    customerId,
    customerName,
    assignedAgents,
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
  return getChatByCustomer(customerId) ?? createChat(customerId, customerName);
}

/**
 * Listar todos los chats ordenados por actividad
 */
export function listChats(): Chat[] {
  return Array.from(chats.values()).sort(
    (a, b) => b.lastActivityAt.getTime() - a.lastActivityAt.getTime()
  );
}

/**
 * Agregar mensaje a un chat
 */
export function addMessageToChat(
  customerId: string,
  senderType: 'customer' | 'agent',
  senderId: string,
  content: string
): Message | null {
  const chat = chats.get(customerId);
  if (!chat) return null;

  const message: Message = {
    id: randomUUID(),
    senderType,
    senderId,
    content,
    createdAt: new Date(),
  };

  chat.messages.push(message);
  chat.lastActivityAt = new Date();

  return message;
}

/**
 * Asignar agente a un chat
 */
export function assignAgentToChat(
  customerId: string,
  agentId: string
): Chat | null {
  const chat = chats.get(customerId);
  if (!chat) return null;

  if (!chat.assignedAgents.includes(agentId)) {
    chat.assignedAgents.push(agentId);
    chat.lastActivityAt = new Date();
  }

  return chat;
}

/**
 * Remover agente de un chat
 */
export function unassignAgentFromChat(
  customerId: string,
  agentId: string
): Chat | null {
  const chat = chats.get(customerId);
  if (!chat) return null;

  chat.assignedAgents = chat.assignedAgents.filter(id => id !== agentId);
  chat.lastActivityAt = new Date();

  return chat;
}

/**
 * Asignar automáticamente un agente disponible
 * (si el chat aún no tiene agentes)
 */
export function autoAssignAgent(customerId: string): Chat | null {
  const chat = chats.get(customerId);
  if (!chat) return null;

  if (chat.assignedAgents.length > 0) {
    return chat;
  }

  const availableAgents = getOnlineAgents();
  if (availableAgents.length === 0) {
    return chat;
  }

  chat.assignedAgents.push(availableAgents[0].id);
  chat.lastActivityAt = new Date();

  return chat;
}

/**
 * Obtener mensajes de un chat
 */
export function getMessagesByChat(customerId: string): Message[] | null {
  const chat = chats.get(customerId);
  if (!chat) return null;

  return chat.messages;
}
