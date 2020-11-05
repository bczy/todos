module.exports = {
	trailingSlash: true,
	exportPathMap: async function () {
		const paths = {
			'/': { page: '/' },
			'/api': { page: '/api' },
			'/api/todos': { page: '/api/todos' },
		};

		return paths;
	},
};
