import knex from "knex";
import config from "../src/config.js";

// MariaDB

try {
  const mariaDbClient = knex(config.mariaDb);
  await mariaDbClient.schema.dropTableIfExists('products');
  await mariaDbClient.schema.createTable('products', table => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.float('price', 50, 2).notNullable();
    table.string('thumbnail', 1024);
  });
  await mariaDbClient.destroy();
  console.log('Tabla de productos en mariaDb creada con éxito');
} catch (error) {

  console.log('Error al crear tabla en mariaDb');
  console.log(error);
}

// SQLite3

try {
  const sqliteClient = knex(config.sqlite3);
  await sqliteClient.schema.dropTableIfExists('messages');
  await sqliteClient.schema.createTable('messages', table => {
    table.increments('id').primary();
    table.string('autor', 30);
    table.string('texto', 128);
    table.string('date', 50);
  });
  await sqliteClient.destroy();
  console.log('Tabla de mensajes en SQLite3 creada con éxito');
} catch (error) {

  console.log('Error al crear tabla en SQLite3');
  console.log(error);
}