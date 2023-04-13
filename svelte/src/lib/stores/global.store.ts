import { writable } from 'svelte/store';

export const bearerToken = writable<null | string>(null);

export const statusbar = writable({ isTransparent: false });

export const currentUser = writable(null);
