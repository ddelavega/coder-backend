const { knex } = require('./../options/clientsDb');

const updateProducts = async (knex) => {
  try {
    row = await knex('products').where({ id: 2 }).update({ name: 'Alfa Romeo' });
  } catch (error) {
    console.log('Error', process.env.DB_CLIENT === 'mysql' ? error.sqlMessage : error);
  }
  finally {
    knex.destroy();
  }

  console.log(row ? 'producto editado' : 'No se pudo editar el producto, revisa si existe');
}

updateProducts(knex);

