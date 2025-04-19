import { CacheType, Client, Interaction } from "discord.js";

export type EventType = ((client: Client<true>) => void) | ((interaction: Interaction<CacheType>) => void);
