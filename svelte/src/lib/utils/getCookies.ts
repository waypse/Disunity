export const getCookies = () => {
	return document.cookie
		.split(';')
		.reduce(
			(ac, cv, i) => Object.assign(ac, { [cv.split('=')[0].trim()]: cv.split('=')[1] }),
			{},
		);
};
