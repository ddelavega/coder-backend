// const { Router } = require('express');
import Router from 'express';
const routerProductos = Router();
import config from './../src/config.js'
import ContainersSQL from './../src/containers/ContainersSQL.js';

const productsAPI = new ContainersSQL(config.mariaDb, 'products');

/* GET PRODUCT/S */

routerProductos.get('/productos', async (req, res) => {
  const products = await productsAPI.getAll();
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


routerProductos.get('/', async (req, res) => {
  const products = await productsAPI.getAll();
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
  let producto = await { ...req.body };
  producto.price = Number(producto.price);
  await productsAPI.save(producto);
  try {
    console.info('Se guardó correctamente!');
    res.redirect('/');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

/* EDIT/UPDATE PRODUCT */

routerProductos.get('/form-edit/:id', async (req, res) => {
  const id = req.params.id;
  let product = await productsAPI.gets(id);
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
  let product = await { ...req.body };
  product.price = Number(product.price);
  await productsAPI.update(product, id);
  try {
    console.info('Se guardó correctamente!');
    res.redirect('/productos');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

/* DELETE PRODUCT */
routerProductos.get('/delete/:id', async (req, res) => {
  const id = req.params.id;
  await productsAPI.delete(id);
  try {
    console.log('Se Borró correctamente!');
    res.redirect('/productos');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

export default routerProductos;