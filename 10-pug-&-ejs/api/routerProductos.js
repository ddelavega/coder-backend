const { Router } = require('express');
const routerProductos = Router();
let productos = [
  {
    "title": "Keycron XSZ",
    "price": 30,
    "thumbnail": "https://picsum.photos/536/600",
    "id": 1
  },
  {
    "title": "Keycron XS",
    "price": 30,
    "thumbnail": "https://picsum.photos/538/600",
    "id": 2
  },
  {
    "title": "Logitech M650",
    "price": 300,
    "thumbnail": "https://picsum.photos/540/600",
    "id": 3
  },
  {
    "title": "Logitech G305",
    "price": 200,
    "thumbnail": "https://picsum.photos/542/600",
    "id": 4
  },
  {
    "title": "SoundCore",
    "price": 100,
    "thumbnail": "https://picsum.photos/544/600",
    "id": 5
  }
];

routerProductos.get('/productos', async (req, res) => {
  try {
    res.render('productos', {
        title: 'Productos',
        productos
      });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

routerProductos.get('/', async (req, res) => {
  try {
    res.render('index', {
        title: 'Formulario de productos',
        productos
      });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

// routerProductos.get('/urlparam', async (req, res) => {
//   try {
//     res.send(req.query);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send('Server error');
//   }
// });

routerProductos.post('/urljson', async (req, res) => {
  try {
    res.send(req.body);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

// routerProductos.get('/api/productos', async (req, res) => {
//   try {
//     res.json({
//       status: 200,
//       message: "Get data ok from index",
//       productos
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send('Server error');
//   }
// });

// routerProductos.get('/api/productos/:id', (req, res) => {
//   const { id } = req.params;
//   res.setHeader('Content-Type', 'text/html');
//   res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
//   if (productos.find(element => element.id === parseInt(id))){
//     res.json(productos.find(element => element.id === parseInt(id)));
//   } else {
//     res.json({msj: `No existe el producto con ID: ${id}`});  
//   }
// });

// routerProductos.put('/api/productos/:id', (req, res) => {
//   const {title, price, thumbnail} = req.body;
//   const { id } = req.params;
//   const exists = productos.find(element => element.id === parseInt(id));
//   const edited = { 'id': parseInt(id), title, price, thumbnail}
//   const prodIndex = productos.findIndex(p => p.id === parseInt(id));
//   exists 
//   ? [productos[prodIndex] = edited, res.json(productos)] 
//   : res.json({msj: `No existe el producto con ID: ${id}`});  
// });

routerProductos.post('/api/productos', async (req, res) => {
  let idX = 0;
  productos.length ? idX = productos[productos.length - 1].id + 1 : idX = 1;
  productos.push({...req.body, id: idX});
  let producto = await {...req.body, id: idX};
  try {
    // res.json({msg: "Subido con éxito!", producto, productos});
    console.info('Se guardó correctamente!');
    res.redirect('/');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

// routerProductos.delete('/api/productos/:id', (req, res) => {
//   const { id } = req.params;
//   const producto = productos.findIndex(p => p.id === parseInt(id));
//   if(producto !== -1) {
//     productos.splice(producto, 1);
//     console.log(producto, productos);
//     res.json({msj: `Se borró el producto con ID: ${id}`});
 
//   } else {
//     console.log(producto, productos);
//     res.json({msj: `No se encontró el producto con ID: ${id}`});
//   }
// });

module.exports = routerProductos;