const { knex } = require('./../options/clientsDb');

// const { knexSqLite } = require('./options/sqlite3');

// const createTable = async (knex) => {
//   try {
//     await knex.schema.createTable('chat', table => {
//       table.increments('id').primary();
//       table.string('texto');
//       table.string('autor');
//       table.string('fecha');
//     });
//     console.log('Table Created!');
//   } catch (error) {
//     console.log('Error', process.env.DB_CLIENT === 'mysql' ? error.sqlMessage : error);
//   }
//   // finally {
//   //   knex.destroy();
//   // }
// }

const createTable = async (knex) => {
  try {
    await knex.schema.createTable('products', table => {
      table.increments('id').primary();
      table.string('title');
      table.integer('price');
      table.string('thumbnail');
    });
    console.log('Table Created!');
  } catch (error) {
    console.log('Error', process.env.DB_CLIENT === 'mysql' ? error.sqlMessage : error);
  }
  // finally {
  //   knex.destroy();
  // }
}

createTable(knex);
// createTable(knexSqLite);

