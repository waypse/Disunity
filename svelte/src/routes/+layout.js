/** @type {import('./$types').LayoutLoad} */
export async function load({ setHeaders }) {
	let bearer = '';
	const auth = await window.electronApi.getStoreValue('auth');
	if (auth && auth.access_token) {
		bearer = auth.access_token;
		setHeaders({ Authorization: `Bearer ${bearer}` });
	}
	return {
		bearer,
	};
}

export const ssr = false;
