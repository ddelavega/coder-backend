const { knex } = require('./../options/clientsDb');

const deleteProduct = async (knex) => {
  try {
    row = await knex('products').where({ id: 1 }).del();
  } catch (error) {
    console.log('Error', process.env.DB_CLIENT === 'mysql' ? error.sqlMessage : error);
  }
  finally {
    knex.destroy();
  }

  console.log(row ? 'producto borrado' : 'No se pudo borrar el producto, revisa si existe');
}

deleteProduct(knex);

