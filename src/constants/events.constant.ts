/* ===== IMPORTS TYPES ===== */
import { EventType } from "../types/event.type";

/* ===== IMPORT EVENTS ===== */
import onReadyClient from "../events/onReadyClient.event";
import onCreateInteraction from "../events/onCreateInteraction.event";

const EVENTS: EventType[] = [ onReadyClient, onCreateInteraction ];

export default EVENTS;
