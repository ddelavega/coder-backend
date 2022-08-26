const { Router } = require('express');
const routerProductos = Router();
const { knex } = require('./../options/mariaDB');

/* GET PRODUCT/S */

routerProductos.get('/productos', async (req, res) => {
  table = 'products';
  const products = JSON.parse(await getProducts(knex, table));
  try {
    res.render('productos', {
      title: 'Productos',
      productos: products
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

const getProducts = async (knex, table, id = null) => {
  try {
    rows = id ? await knex.from(`${table}`).select('*').where({ id: id }) : await knex.from(`${table}`).select('*');
  } catch (error) {
    console.log('Error', error);
  }
  rows.length ? console.log('Se cargaron los Productos') : console.log('No hay productos');
  return JSON.stringify(rows);
}

routerProductos.get('/', async (req, res) => {
  table = 'products';
  const products = JSON.parse(await getProducts(knex, table));
  try {
    res.render('index', {
      title: 'Formulario de productos',
      productos: products
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

/* CREATE PRODUCT */

routerProductos.post('/api/productos', async (req, res) => {
  table = 'products'
  let producto = await { ...req.body };
  await insertProducts(knex, table, producto)
  try {
    console.info('Se guardó correctamente!');
    res.redirect('/');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

const insertProducts = async (knex, table, producto) => {
  console.log('Producto a enviar', producto)
  productToSend = {
    title: producto.title,
    price: Number(producto.price),
    thumbnail: producto.thumbnail
  }
  try {
    row = await knex(`${table}`).insert(productToSend);
    console.log('ROW', row);
  } catch (error) {
    console.log('Error', process.env.DB_CLIENT === 'mysql' ? error.sqlMessage : error);
  }
  console.log('producto agregado');
}

/* EDIT/UPDATE PRODUCT */

routerProductos.get('/form-edit/:id', async (req, res) => {
  const id = req.params.id;
  table = 'products';
  const product = JSON.parse(await getProducts(knex, table, id));
  try {
    res.render('edit', {
      title: 'Formulario de edición productos',
      product: product[0]
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

routerProductos.post('/edit/:id', async (req, res) => {
  const id = req.params.id;
  table = 'products';
  let producto = await { ...req.body };
  await updateProducts(knex, table, id, producto)
  try {
    console.info('Se guardó correctamente!');
    res.redirect('/productos');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

const updateProducts = async (knex, table, id, producto) => {
  try {
    row = await knex(`${table}`).where({ id: id }).update(producto);
  } catch (error) {
    console.log('Error', process.env.DB_CLIENT === 'mysql' ? error.sqlMessage : error);
  }
  console.log(row ? 'producto editado' : 'No se pudo editar el producto, revisa si existe');
}

/* DELETE PRODUCT */
routerProductos.get('/delete/:id', async (req, res) => {
  table = 'products'
  const id = req.params.id;
  console.log('Get id to delete', id);
  await deleteProduct(knex, table, id)
  try {
    console.info('Se Borró correctamente!');
    res.redirect('/productos');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

const deleteProduct = async (knex, table, id) => {
  console.log('Get id to delete', id);
  await getProducts(knex, table, id)
  try {
    row = await knex(`${table}`).where({ id: id }).del();
  } catch (error) {
    console.log('Error', error);
  }
  console.log(row ? 'producto borrado' : 'No se pudo borrar el producto, revisa si existe');
}


module.exports = routerProductos;