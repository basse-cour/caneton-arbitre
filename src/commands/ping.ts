import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { CommandType } from "../types/command.type";

const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!')
;

async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  await interaction.reply('Pong!');
}

const command: CommandType = { data, execute };

export default command;
