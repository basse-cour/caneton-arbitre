import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { CommandType } from "./types/command.type";
import commands from "./constants/commands.constant";
import { Logger } from "./utils/logger.util";
import onReadyClient from "./events/onReadyClient.event";
import onCreateInteraction from "./events/onCreateInteraction.event";

const logger = new Logger("Main");

declare module "discord.js" {
    interface Client {
        commands: Collection<string, CommandType>;
    }
};

function main(): void {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  client.commands = new Collection();

  registerCommands(client);
  registerEventsListeners(client);

  client.login(process.env.DISCORD_TOKEN).catch((error) => {
    logger.error("Failed to login to Discord: ", error);
  });
}

function registerEventsListeners(client: Client): void {
  client.once(Events.ClientReady, onReadyClient);
  client.on(Events.InteractionCreate, onCreateInteraction);
}

function registerCommands(client: Client): void {
  commands.forEach(command => client.commands.set(command.data.name, command));
}

main();
