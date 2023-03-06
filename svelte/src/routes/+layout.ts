import { browser } from '$app/environment';
import type { LayoutLoad } from './$types';

export const load = (async () => {
	let access_token: string | null = null;

	if (browser) {
		access_token = await window.electronApi.auth('get');
	}

	return {
		access_token,
	};
}) satisfies LayoutLoad;

export const prerender = true;
export const ssr = false;
