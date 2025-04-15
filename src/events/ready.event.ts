import { Client } from 'discord.js';
import { Logger } from '../tools/logger.tool';

export const event = {
  name: 'ready',
  once: true,
  execute(client: Client) {
    const logger = new Logger('Ready');
    logger.log(`Bot connecté en tant que ${client.user?.tag}`);
  },
};