import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { Command } from "./types/command";
import { onCreateInteraction, onReadyClient } from "./listeners";
import commands from "./commands/commands";

declare module "discord.js" {
    interface Client {
        commands: Collection<string, Command>;
    }
};

function main(): void {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    client.commands = new Collection();

    registerCommands(client);
    registerEventsListeners(client);

    client.login(process.env.DISCORD_TOKEN).catch((error) => {
        console.error("Failed to login to Discord: ", error);
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
