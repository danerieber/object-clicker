import { writable } from "svelte/store";

export const objects = writable(500.0);
export const objectsPerSecond = writable(0.0);
export const opsMultiplier = writable(1.0);