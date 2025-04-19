import { ClientEvents } from "discord.js";

/* ===== Required util ===== */
import { Logger } from "../utils/logger.util";

/**
 * Listener for the 'interactionCreate' event.
 * This event is triggered when an interaction is created.
 *
 * Handles the interaction and executes the corresponding command.
 */
const onCreateInteraction: (interaction: ClientEvents['interactionCreate'][0]) => void = (interaction) => {
  const logger = new Logger('InteractionCreate');

  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    logger.warn(`Command ${interaction.commandName} not found`);
    return;
  }

  try {
    command.execute(interaction).catch((error) => {
      logger.error(`Error executing command ${interaction.commandName}: ${error}`);
    });
  } catch (error) {
    logger.error(`Unexpected error: ${error}`);
  }
};

export default onCreateInteraction;
