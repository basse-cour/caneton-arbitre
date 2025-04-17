// Author: Andgel.B | Date: 2025-04-15 | File: ready.events.ts

/* ===== Required modules ===== */
import { Client } from 'discord.js';
import { Logger } from '../utils/logger.util';

/**
 * Event handler for the 'ready' event.
 * This event is triggered when the bot successfully logs in and becomes ready.
 *
 * @property {string} name - The name of the event ('ready').
 * @property {boolean} once - Indicates that this event should only be executed once.
 * @method execute - The function to execute when the event is triggered.
 * @param {Client} client - The Discord client instance.
 *
 * Logs a message indicating that the bot is connected and displays the bot's tag.
 */
export const event = {
  name: 'ready',
  once: true,
  execute(client: Client) {
    const logger = new Logger('Ready');
    logger.log(`Ready! Logged in as ${client.user?.tag}`);
  },
};
