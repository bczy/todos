module.exports = {
	trailingSlash: true,
	exportPathMap: async function () {
		const paths = {
			'/': { page: '/' },
			'/api': { page: '/api' },
		};

		return paths;
	},
};
