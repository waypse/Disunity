import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const [identifier, password] = [data.get('identifier'), data.get('password')];
	},
	register: async ({ cookies, request }) => {
		const data = await request.formData();
		const [email, password, username] = [
			data.get('email'),
			data.get('password'),
			data.get('username'),
		];

		if (!email || !password || !username) {
			return fail(400, 'Missing required fields');
		}
	},
};
