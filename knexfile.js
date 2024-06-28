require('dotenv').config();
module.exports = {
	development: {
		client: 'pg',
		connection: {
			host: process.env.DB_HOST,
			database: process.env.DB_NAME,
			user: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD
		},
		migrations: {
			directory: './src/migrations'
		},
		seeds: {
			directory: './src/seeds'
		}
	}
};
