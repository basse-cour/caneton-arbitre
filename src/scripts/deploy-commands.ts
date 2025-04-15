import { REST, Routes } from "discord.js";
import commandList from "../commands/commands";

async function deployCommands() {
    const token = process.env.DISCORD_TOKEN;
    const clientId = process.env.DISCORD_APPLICATION_ID;
    const guildId = process.env.DISCORD_SERVER_ID;

    if(! token) {
        throw new Error("DISCORD_TOKEN environment variable is not defined");
    }
    if(! clientId) {
        throw new Error("DISCORD_CLIENT_ID environment variable is not defined");
    }
    if(! guildId) {
        throw new Error("DISCORD_SERVER_ID environment variable is not defined");
    }

    const rest = new REST().setToken(token);

    const commands = commandList.map(command => command.data.toJSON());

    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        if(Array.isArray(data)) {
            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } else {
            console.warn("Request was successful, but we expected Discord to return an array. Got:\n" + data);
        }
    } catch (error) {
        console.error(error);
    }
}

deployCommands().then(() => console.log("Commands deployed successfully"));
