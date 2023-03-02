/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const indentifier = data.get('identifier');
		const password = data.get('password');

		console.log('login', indentifier, password);
		return { success: true };
	},
	register: async (event) => {
		// TODO register the user
	},
};
