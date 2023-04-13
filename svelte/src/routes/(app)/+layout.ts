import { browser } from '$app/environment';
import type { LayoutLoad } from './$types';

export const load = (async ({ parent }) => {
	const { access_token } = await parent();

	if (!access_token) {
		let at: string | null = null;

		if (browser) {
			at = await window.electronApi.auth('get');
		}
		return {
			access_token: at,
		};
	}
}) satisfies LayoutLoad;
