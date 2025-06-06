import { SlashCommandBuilder } from "discord.js";

export type Command = {
    data: SlashCommandBuilder,
    execute: (interaction: any) => Promise<void>,
}
