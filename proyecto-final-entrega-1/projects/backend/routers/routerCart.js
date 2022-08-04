const { Router } = require('express');
const { CartDbPersist } = require('../api/cartDbPersist');

const routerCart = Router();
const CartApi = new CartDbPersist('cartDB');

// let cart = [
//   // {
//   //   "title": "SoundCore",
//   //   "price": 100,
//   //   "thumbnail": "https://picsum.photos/id/503/600/600",
//   //   "id": 5,
//   //   "timestamp": '1241241'
//   // }
// ];

const cartBase = '/api/cart';

routerCart.post(`${cartBase}`, async (req, res) => {
  // res.json({ msg: "Cart subido con éxito!", body: req.body });

  const carts = await CartApi.getAll();
  const id = String(Date.now());
  const products = [];
  const timestamp = Date.now();
  let cartToSend = { id, timestamp, products }


  let cart = await { cartToSend };
  console.log('cart', cart, carts);
  // let id = 0;
  // carts.length ? id = cart[carts.length - 1].id + 1 : id = 1;

  carts.push({ cartToSend });
  console.log('carssst', cartToSend, carts);
  const response = await CartApi.save(cartToSend);
  // const response = ProductApi.save(product);
  // res.redirect('/carts.html');
  try {
    console.log('response', response);
    res.json({ msg: "Cart subido con éxito!", cart, carts });

  } catch (error) {
    console.error(error);
    return res.sendStatus(500).send('Server error');
  }
});


routerCart.post(`${cartBase}/:id/products`, async (req, res) => {
  const { id, product } = req.body;
  const timestamp = Date.now();

  let carts = await CartApi.getAll();
  const cart = carts.find((e) => e.id === id);

  if (cart) {
    // const products = cart['products'];

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


routerCart.get(`${cartBase}/:id/products`, async (req, res) => {
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


routerCart.get('/api/cart', async (req, res) => {
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




// TODO: DELETE PRODUCT FROM CART

routerCart.delete(`${cartBase}/:id/products/:id_product`, async (req, res) => {
  const { id, id_product } = req.params;
  console.log('req.params', req.params);


  // console.log('product', product);
  const response = await CartApi.deleteProductFromCart(id, id_product);
  console.log('response', response);
  if (response.error) {
    return res.sendStatus(500).json({ msj: `No se encontró el product con ID: ${id_product}` });
  } else {
    res.json({ msj: `Se borró el product con ID: ${id_product}`, statusCode: 200 });
  }



});


// TODO: DELETE

routerCart.delete(`${cartBase}/:id`, async (req, res) => {
  const { id } = req.params;
  console.log('id cart from router', id);

  // console.log('product', product);
  const response = await CartApi.deleteById(id);
  console.log('response', response);
  if (response.error) {
    return res.sendStatus(500).json({ msj: `No se encontró el cart con ID: ${id}` });
  } else {
    res.json({ msj: `Se borró el cart con ID: ${id}`, statusCode: 200 });
  }

});
// routerCart.get('/api/productos/:id', (req, res) => {
//   const { id } = req.params;
//   res.setHeader('Content-Type', 'text/html');
//   res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
//   if (productos.find(element => element.id === parseInt(id))) {
//     res.json(productos.find(element => element.id === parseInt(id)));
//   } else {
//     res.json({ msj: `No existe el producto con ID: ${id}` });
//   }
// });

// routerCart.put('/api/productos/:id', (req, res) => {
//   const { title, price, thumbnail } = req.body;
//   const { id } = req.params;
//   const exists = productos.find(element => element.id === parseInt(id));
//   const edited = { 'id': parseInt(id), title, price, thumbnail }
//   const prodIndex = productos.findIndex(p => p.id === parseInt(id));
//   exists
//     ? [productos[prodIndex] = edited, res.json(productos)]
//     : res.json({ msj: `No existe el producto con ID: ${id}` });
// });

// routerCart.post('/api/productos', async (req, res) => {
//   let idX = 0;
//   productos.length ? idX = productos[productos.length - 1].id + 1 : idX = 1;
//   productos.push({ ...req.body, id: idX });
//   let producto = await { ...req.body, id: idX };
//   try {
//     res.json({ msg: "Subido con éxito!", producto, productos });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send('Server error');
//   }
// });

// routerCart.delete('/api/productos/:id', (req, res) => {
//   const { id } = req.params;
//   const producto = productos.findIndex(p => p.id === parseInt(id));
//   if (producto !== -1) {
//     productos.splice(producto, 1);
//     console.log(producto, productos);
//     res.json({ msj: `Se borró el producto con ID: ${id}` });

//   } else {
//     console.log(producto, productos);
//     res.json({ msj: `No se encontró el producto con ID: ${id}` });
//   }
// });

module.exports = routerCart;
