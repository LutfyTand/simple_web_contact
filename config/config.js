const environment = process.env.NODE_ENV || 'development';

module.exports = {
  development: {
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_ROOT_PASSWORD,
    dialect: 'mysql',
  }
};