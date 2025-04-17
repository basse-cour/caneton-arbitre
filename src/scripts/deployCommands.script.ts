import { REST, Routes } from "discord.js";
import commandList from "../constants/commands.constant";
import { Logger } from "../utils/logger.util";
import { readdirSync } from "fs";
import { join } from "path";

const logger = new Logger("scripts/deploy-commands");

async function deployCommands() {
  const token = process.env.DISCORD_TOKEN;
  const applicationClientId = process.env.DISCORD_APPLICATION_ID;
  const guildId = process.env.DISCORD_SERVER_ID;

  if (!token) {
    throw new Error("DISCORD_TOKEN environment variable is not defined");
  }
  if (!applicationClientId) {
    throw new Error("DISCORD_APPLICATION_ID environment variable is not defined");
  }
  if (!guildId) {
    throw new Error("DISCORD_SERVER_ID environment variable is not defined");
  }

  const rest = new REST().setToken(token);

  const commands = commandList.map((command) => command.data.toJSON());

  let commandFiles: string[] = [];
  try { 
    const commandsDir = join(__dirname, "../commands");
    commandFiles = readdirSync(commandsDir).filter((file) =>
      file.endsWith(".command.ts")
    );

    if (commandFiles.length > commandList.length) {
      const missingCommands = commandFiles.filter((file) => 
        !commandList.some((command) => file.includes(command.data.name))
      );

      logger.warn(
        `There are more command files (${commandFiles.length}) than commands in the list (${commandList.length}). Missing commands: ${missingCommands.join(", ")}`
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Failed to read commands directory: ${error.message}`);
    } else {
      logger.error("Failed to read commands directory due to an unknown error.");
    }
    return;
  }

  try {
    logger.log(`Started refreshing ${commands.length} application (/) commands.`);

    const data = await rest.put(
      Routes.applicationGuildCommands(applicationClientId, guildId),
      { body: commands }
    );

    if (Array.isArray(data)) {
      logger.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } else {
      logger.warn(
        "Request was successful, but we expected Discord to return an array. Got:\n" +
          data
      );
    }
  } catch (error) {
    console.error(error);
  }
  // Log the number of commands in the list and in the folder in one line
  logger.log(`Commands deployed: ${commandList.length}/${commandFiles.length}`);
}

deployCommands()
  .then(() => logger.log("Deployment process completed.")).catch((error) => {
    if (error instanceof Error) {
      logger.error(`Error during command deployment: ${error.message}`);
    }
    else {
      logger.error("Error during command deployment: Unknown error occurred.");
    }
  });
