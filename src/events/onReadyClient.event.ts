/* ===== Required modules ===== */
import { Client } from 'discord.js';

/* ===== Required util ===== */
import { Logger } from '../utils/logger.util';

/**
 * Listener for the 'ready' event.
 * This event is triggered when the bot successfully logs in and becomes ready.
 *
 * Logs a message indicating that the bot is connected and displays the bot's tag.
 */
const onReadyClient = (client: Client<true>): void => {
  const logger = new Logger('Ready');
  logger.log(`Ready! Logged in as ${client.user?.tag}`);
};

export default onReadyClient;
