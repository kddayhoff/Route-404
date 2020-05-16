module.exports = {
  development: {
    username: process.env.DB_PROD_USERNAME,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_DATABASE,
    host: process.env.DB_PROD_HOST,
    dialect: 'mysql'
  },
  staging: {
    username: process.env.DB_PROD_USERNAME,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_DATABASE,
    host: process.env.DB_PROD_HOST,
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_PROD_USERNAME,
    password: process.env.DB_PROD_PASSWORD,
    "use_env_variable": "JAWSDB_URL",
    host: process.env.DB_PROD_HOST,
    dialect: 'mysql'
  }
};
