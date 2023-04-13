import { bearerToken } from '$lib/stores/global.store';
import { get } from 'svelte/store';

type FetchOptions = {
	method?: string | undefined;
	headers?: Record<string, string> | undefined;
	body?: FormData | string | null | undefined;
};

const ERRORS_CODE_NO_RETRY = [400, 401, 405, 500, 406];
const STATUS_CODES_OK = [200, 201, 202];
const MAX_RETRIES = 3;
const DELAY_BETWEEN_CALLS = 200;

const baseUrl = `http://localhost:3333`;

export async function fetchKit(
	endpoint: string,
	options: FetchOptions = { method: 'GET', headers: {}, body: null },
	retry: boolean = true,
): Promise<any> {
	let retryCount = 0;

	const url = `${baseUrl}${endpoint}`;

	if (!options.headers?.Authorization?.includes('Bearer')) {
		options.headers = {
			...options.headers,
			Authorization: 'Bearer ' + get(bearerToken),
		};
	}

	try {
		const response = await fetch(url, options);

		if (!response) throw new Error(`No response fetching: ${url}`);

		if (STATUS_CODES_OK.includes(response.status)) {
			const responseContentType = response.headers.get('Content-Type');
			if (responseContentType?.indexOf('application/json') !== -1) return response.json();
			else return response.text();
		}

		if (ERRORS_CODE_NO_RETRY.includes(response.status) || !retry)
			return Promise.reject(await response.json());

		if (retryCount < MAX_RETRIES)
			return new Promise((resolve) => {
				retryCount++;
				setTimeout(() => resolve(fetchKit(endpoint, options, retry)), DELAY_BETWEEN_CALLS);
			});
	} catch (error) {
		console.error('Login error from fetchKit', error);
		return Promise.reject(error);
	}
}
