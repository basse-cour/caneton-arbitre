import { REST, Routes } from "discord.js";
import commandList from "../commands/commands";
import { Logger } from "../tools/logger.tool";

const logger = new Logger("scripts/deploy-commands");

async function deployCommands() {
  const token = process.env.DISCORD_TOKEN;
  const applicationClientId = process.env.DISCORD_APPLICATION_ID;
  const guildId = process.env.DISCORD_SERVER_ID;

  if(! token) {
    throw new Error("DISCORD_TOKEN environment variable is not defined");
  }
  if(! applicationClientId) {
    throw new Error("DISCORD_APPLICATION_ID environment variable is not defined");
  }
  if(! guildId) {
    throw new Error("DISCORD_SERVER_ID environment variable is not defined");
  }

  const rest = new REST().setToken(token);

  const commands = commandList.map(command => command.data.toJSON());

  try {
    logger.log(`Started refreshing ${commands.length} application (/) commands.`);

    const data = await rest.put(
      Routes.applicationGuildCommands(applicationClientId, guildId),
      { body: commands },
    );

    if(Array.isArray(data)) {
      logger.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } else {
      logger.warn("Request was successful, but we expected Discord to return an array. Got:\n" + data);
    }
  } catch (error) {
    console.error(error);
  }
}

deployCommands().then(() => logger.log("Commands deployed successfully"));
