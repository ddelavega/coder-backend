const { Router } = require('express');
const { CartDbPersist } = require('../api-containers/cartDbPersist');

const routerCart = Router();
const CartApi = new CartDbPersist('cartDB');

routerCart.get('/', async (req, res) => {
  try {
    const cart = await CartApi.getAll();
    res.json({
      status: 200,
      message: "Get data ok from Cart",
      cart
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

routerCart.post('/', async (req, res) => {
  const carts = await CartApi.getAll();
  const id = String(Date.now());
  const products = [];
  const timestamp = Date.now();
  let cartToSend = { id, timestamp, products }
  let cart = await { cartToSend };
  console.log('cart', cart, carts);
  carts.push({ cartToSend });
  console.log('carssst', cartToSend, carts);
  const response = await CartApi.save(cartToSend);
  try {
    console.log('response', response);
    res.json({ msg: "Cart subido con éxito!", cart, carts });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500).send('Server error');
  }
});

routerCart.post('/:id/products', async (req, res) => {
  const { id, product } = req.body;
  const timestamp = Date.now();
  let carts = await CartApi.getAll();
  const cart = carts.find((e) => e.id === id);
  if (cart) {
    const productIndex = cart.products.findIndex((e) => e.id === product.id);
    if (cart.products.length && productIndex !== -1) {
      console.log('QTY 1', cart.products[productIndex].quantity);
      cart.products[productIndex].quantity += 1;
      console.log('QTY 2', cart.products[productIndex].quantity);
    } else if (cart.products.length && productIndex === -1) {
      product.quantity = 1;
      cart.products.push(product);
    } else {
      cart.products = [...cart.products, product];
    };
    cartToSend = cart;
    console.log('cartToSend', cartToSend);
    console.log('existe');
  } else {
    product.quantity = 1;
    cartToSend = { id, timestamp, products: [product] };
    console.log('no existe lo crea');
  }
  const response = await CartApi.updateByCartId(id, cartToSend);
  try {
    console.log('response', response);
    res.json({ msg: "Subido con éxito!", cartToSend });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500).send('Server error');
  }
});

routerCart.get('/:id/products', async (req, res) => {
  const { id } = req.params;
  console.log('req.body', req.params);
  const response = await CartApi.getProductsByCartId(id);
  try {
    console.log('response', response);
    res.json({
      status: 200,
      message: "Get data ok from Cart",
      response
    });

  } catch (error) {
    console.error(error);
    return res.sendStatus(500).send('Server error');
  }
});

routerCart.get('/', async (req, res) => {
  try {
    const cart = await CartApi.getAll();
    res.json({
      status: 200,
      message: "Get data ok from Cart",
      cart
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

routerCart.delete('/:id/products/:id_product', async (req, res) => {
  const { id, id_product } = req.params;
  console.log('req.params', req.params);
  const response = await CartApi.deleteProductFromCart(id, id_product);
  console.log('response', response);
  if (response.error) {
    return res.sendStatus(500).json({ msj: `No se encontró el product con ID: ${id_product}` });
  } else {
    res.json({ msj: `Se borró el product con ID: ${id_product}`, statusCode: 200 });
  }
});

routerCart.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('id cart from router', id);
  const response = await CartApi.deleteById(id);
  console.log('response', response);
  if (response.error) {
    return res.sendStatus(500).json({ msj: `No se encontró el cart con ID: ${id}` });
  } else {
    res.json({ msj: `Se borró el cart con ID: ${id}`, statusCode: 200 });
  }
});

module.exports = routerCart;
