import { Agent } from './agent.model';

export const agents: Agent[] = [];

export function getOnlineAgents(): Agent[] {
  return agents.filter(agent => agent.online);
}
