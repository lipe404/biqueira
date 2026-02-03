import { POSITIVE_EVENTS } from "./events/positive.js";
import { NEGATIVE_EVENTS } from "./events/negative.js";
import { NEUTRAL_EVENTS } from "./events/neutral.js";

export const EVENTS = [
  ...POSITIVE_EVENTS,
  ...NEGATIVE_EVENTS,
  ...NEUTRAL_EVENTS
];
