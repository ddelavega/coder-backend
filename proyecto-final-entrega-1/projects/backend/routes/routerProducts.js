const { Router } = require('express');
const { DbPersist } = require('../api-containers/dbPersist');

const routerProducts = Router();
const ProductApi = new DbPersist('productsDB');

routerProducts.get('/', async (req, res) => {
  try {
    const products = await ProductApi.getAll();
    res.json({
      status: 200,
      message: "Get data ok from Products",
      products
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});


routerProducts.get('/:id', async (req, res) => {
  const { id } = req.params;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  const products = await ProductApi.getAll();
  const productIndex = products.findIndex(p => p.id === id);
  const product = products[productIndex];
  try {
    res.json({
      status: 200,
      message: "Get data ok from Product By Id",
      product
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

routerProducts.put('/:id', async (req, res) => {
  const { title, price, thumbnail, stock } = req.body;
  const timestamp = Date.now();
  const { id } = req.params;
  let product = await { id, title, price: Number(price), thumbnail, timestamp, stock: Number(stock) };
  try {
    const response = await ProductApi.updateById(id, product);
    console.log('response', response);
    res.json({ msg: "Editado con éxito!", product });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

routerProducts.post('/', async (req, res) => {
  const { price, stock } = req.body;
  const timestamp = Date.now();
  const id = String(Date.now());
  let product = await { ...req.body, id, price: Number(price), timestamp, stock: Number(stock) };
  try {
    const response = await ProductApi.save(product);
    console.log('response', response);
    res.json({ msg: "Subido con éxito!", product });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500).send('Server error');
  }
});

routerProducts.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('id from router', id);
  const response = await ProductApi.deleteById(id);
  console.log('response', response);
  if (response.error) {
    return res.sendStatus(500).json({ msj: `No se encontró el product con ID: ${id}` });
  } else {
    res.json({ msj: `Se borró el product con ID: ${id}`, statusCode: 200 });
  }
});

module.exports = routerProducts;
