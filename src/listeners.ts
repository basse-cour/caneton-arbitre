import { BaseInteraction, Client } from "discord.js";

export function onReadyClient(client: Client): void {
  console.log(`Ready! Logged in as ${client.user?.tag}`);
}

export async function onCreateInteraction(interaction: BaseInteraction): Promise<void> {
  if(! interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);
  if (! command) {
    console.warn(`Command ${interaction.commandName} not found`);
    return;
  }

  return command.execute(interaction);
}
