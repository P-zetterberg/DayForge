import { writable } from "svelte/store";

export const generatedText = writable([]);

export const isLoading = writable(false);
