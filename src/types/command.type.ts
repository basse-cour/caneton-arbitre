import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export type CommandType = {
    data: SlashCommandBuilder,
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>,
}
