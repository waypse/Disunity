export async function fetchKit(url, options) {
	const response = await fetch(url, options);
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return response;
}
