const fetch = require('electron-fetch').default;

const getAuth = async (store, env) => {
	const { access_token, refresh_token } = store.get('auth');

	if (!access_token && !refresh_token) return null;

	const req = await fetch(`${env.get('API_ROUTE')}/auth/verify-at`, {
		method: 'GET',
		headers: {
			Authorization: `${access_token}`,
		},
	});

	const res = await req.json();

	if (res === true) return access_token;

	const rtReq = await fetch(`${env.get('API_ROUTE')}/auth/refresh`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${refresh_token}`,
		},
	});

	if (rtReq.status !== 200) return null;

	const rtRes = await rtReq.json();
	store.set('auth', rtRes);

	return rtRes.access_token;
};

const login = async (store, env, values) => {
	const { identifier, password } = values;
	const loginRoute = `${env.get('API_ROUTE')}/auth/local/signin`;
	const res = await fetch(loginRoute, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ identifier, password }),
	});

	if (res.status === 403) return { error: 'Login or password is invalid' };
	if (res.status !== 200) return { error: 'Something went wrong' };

	const tokens = await res.json();
	store.set('auth', tokens);

	return tokens.access_token;
};

const register = async (store, env, values) => {
	const { username, email, password } = values;
	const registerRoute = `${env.get('API_ROUTE')}/auth/local/signup`;
	const res = await fetch(registerRoute, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username, email, password }),
	});

	if (res.status !== 201) return { error: 'Something went wrong' };

	const tokens = await res.json();
	store.set('auth', tokens);

	return tokens.access_token;
};

const logout = async (store, env) => {
	await fetch(`${env.get('API_ROUTE')}/auth/logout`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${store.get('auth.access_token')}`,
		},
	});

	store.set('auth', {
		access_token: '',
		refresh_token: '',
	});
};

module.exports = {
	getAuth,
	login,
	register,
	logout,
};
