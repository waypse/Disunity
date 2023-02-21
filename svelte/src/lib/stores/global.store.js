import { writable } from 'svelte/store';

export const bearerToken = writable(null);

export const statusbar = writable({ isTransparent: false });
