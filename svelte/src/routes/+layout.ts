import type { LayoutLoad } from './$types';

export const load = (async () => {
	let bearer = null;
	const auth = await window.electronApi.auth('get');
	if (auth && auth.access_token) {
		bearer = auth.access_token;
	}
	return {
		bearer,
	};
}) satisfies LayoutLoad;

export const ssr = false;
