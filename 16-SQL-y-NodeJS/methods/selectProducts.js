const { knex } = require('./../options/clientsDb');

const getProducts = async (knex) => {
  try {
    rows = await knex.from('products').select('*');
    for (const row of rows) {
      console.log(`${row['id']} ${row['title']}`);
    }
  } catch (error) {
    console.log('Error', process.env.DB_CLIENT === 'mysql' ? error.sqlMessage : error);
  }
  finally {
    knex.destroy();
  }
  // rows.length ? console.log('Se cargaron los Productos') : console.log('No hay productos');


}
getProducts(knex);

