const { Router } = require('express');
const { DbPersist } = require('../api/dbPersist');

const routerProducts = Router();
const ProductApi = new DbPersist('productsDB');
let products = [
  // {
  //   "title": "Keycron XSZ",
  //   "price": 30,
  //   "thumbnail": "https://picsum.photos/id/103/600/600",
  //   "id": 1,
  //   "timestamp": '1241241'
  // },
  // {
  //   "title": "Keycron XS",
  //   "price": 30,
  //   "thumbnail": "https://picsum.photos/id/203/600/600",
  //   "id": 2,
  //   "timestamp": '1241241'
  // },
  // {
  //   "title": "Logitech M650",
  //   "price": 300,
  //   "thumbnail": "https://picsum.photos/id/300/600/600",
  //   "id": 3,
  //   "timestamp": '1241241'
  // },
  // {
  //   "title": "Logitech G305",
  //   "price": 200,
  //   "thumbnail": "https://picsum.photos/id/403/600/600",
  //   "id": 4,
  //   "timestamp": '1241241'
  // },
  // {
  //   "title": "SoundCore",
  //   "price": 100,
  //   "thumbnail": "https://picsum.photos/id/503/600/600",
  //   "id": 5,
  //   "timestamp": '1241241'
  // }
];


routerProducts.get('/api/products', async (req, res) => {
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

routerProducts.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  if (products.find(element => element.id === parseInt(id))) {
    res.json(products.find(element => element.id === parseInt(id)));
  } else {
    res.json({ msj: `No existe el product con ID: ${id}` });
  }
});

// TODO: PUT
routerProducts.put('/api/products/:id', async (req, res) => {
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

routerProducts.post('/api/products', async (req, res) => {
  const { price, stock } = req.body;
  const timestamp = Date.now();
  let id = 0;

  products.length ? id = products[products.length - 1].id + 1 : id = 1;
  products.push({ ...req.body, id, price: Number(price), timestamp });
  let product = await { ...req.body, id, price: Number(price), timestamp, stock: Number(stock) };
  // const response = ProductApi.save(product);
  // res.redirect('/products.html');
  try {
    const response = await ProductApi.save(product);
    console.log('response', response);
    res.json({ msg: "Subido con éxito!", product, products });

  } catch (error) {
    console.error(error);
    return res.sendStatus(500).send('Server error');
  }
});

// TODO: DELETE

routerProducts.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  console.log('id from router', id);

  // console.log('product', product);
  const response = await ProductApi.deleteById(id);
  console.log('response', response);
  if (response.error) {
    return res.sendStatus(500).json({ msj: `No se encontró el product con ID: ${id}` });
  } else {
    res.json({ msj: `Se borró el product con ID: ${id}`, statusCode: 200 });
  }

});



module.exports = routerProducts;
