const { knex } = require('./../options/clientsDb');

const insertProducts = async (knex) => {
  try {
    await knex('products').insert({
      title: 'BMW'
    });
  } catch (error) {
    console.log('Error', process.env.DB_CLIENT === 'mysql' ? error.sqlMessage : error);
  }
  finally {
    knex.destroy();
  }
  console.log('producto agregado');
}

insertProducts(knex);

