import { Client, Events, GatewayIntentBits } from "discord.js";

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds] });

discordClient.once(Events.ClientReady, onReadyClient);

discordClient.login(process.env.DISCORD_TOKEN).catch((error) => {
    console.error("Failed to login to Discord: ", error);
});

function onReadyClient(client: Client): void {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
}
