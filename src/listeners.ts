import { BaseInteraction, Client } from "discord.js";
import { Logger } from "./tools/logger.tool";

const logger = new Logger("Listener");

export function onReadyClient(client: Client): void {
  logger.log(`Ready! Logged in as ${client.user?.tag}`);
}

export async function onCreateInteraction(interaction: BaseInteraction): Promise<void> {
  if(! interaction.isChatInputCommand()) return;

  logger.verbose(`Command: ${interaction.commandName}`);

  const command = interaction.client.commands.get(interaction.commandName);
  if (! command) {
    logger.warn(`Command ${interaction.commandName} not found`);
    return;
  }

  return command.execute(interaction);
}
