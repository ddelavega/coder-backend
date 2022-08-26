require('dotenv').config();

if (process.env.DB_CLIENT === 'mysql') {

  const knex = require('knex')({
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    pool: { min: 0, max: 7 }
  });
  module.exports = { knex };
}

if (process.env.DB_CLIENT === 'sqlite3') {

  const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: './DB/ecommerce.sqlite'
    },
    useNullAsDefault: true
  });

  module.exports = { knex };
}