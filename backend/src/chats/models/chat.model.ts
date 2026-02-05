export interface Message {
  id: string;
  senderType: 'customer' | 'agent';
  senderId: string;
  content: string;
  createdAt: Date;
}

export interface Chat {
  id: string;
  customerId: string;
  customerName?: string;
  assignedAgents: string[];
  messages: Message[];
  createdAt: Date;
  lastActivityAt: Date;
}
