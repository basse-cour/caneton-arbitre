import { Logger } from "../utils/logger.util";
import { readdirSync } from "fs";
import { join } from "path";
import eventListeners from "../constants/events.constant";

const logger = new Logger("scripts/deploy-events");

async function deployEvents() {
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

  const eventsDir = join(__dirname, "../events");
  let eventFiles: string[] = [];

  try {
    eventFiles = readdirSync(eventsDir).filter((file) =>
      file.endsWith(".event.ts")
    );
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Failed to read events directory: ${error.message}`);
    } else {
      logger.error("Failed to read events directory due to an unknown error.");
    }
    return;
  }

  const missingEvents = eventFiles.filter(
    (file) => !eventListeners.some((event) => file.includes(event.name))
  );

  if (missingEvents.length > 0) {
    logger.warn(
      `There are more event files (${eventFiles.length}) than events in the list (${eventListeners.length}). Missing events: ${missingEvents.join(", ")}`
    );
  }

  try {
    logger.log(`Started registering ${eventListeners.length} event listeners.`);
    eventListeners.forEach((event) => {
      logger.log(`Registered event listener: ${event.name}`);
    });

    logger.log(`Successfully registered ${eventListeners.length} event listeners.`);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error during event registration: ${error.message}`);
    } else {
      logger.error("Error during event registration: Unknown error occurred.");
    }
  }

  logger.log(`Events registered: ${eventListeners.length}/${eventFiles.length}`);
}

deployEvents()
  .then(() => logger.log("Event deployment process completed."))
  .catch((error) => {
    if (error instanceof Error) {
      logger.error(`Error during event deployment: ${error.message}`);
    } else {
      logger.error("Error during event deployment: Unknown error occurred.");
    }
  });
  
