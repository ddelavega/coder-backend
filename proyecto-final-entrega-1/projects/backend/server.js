const express = require('express');
const cors = require('cors');

const routerProducts = require('./routes/routerProducts');
const routerCart = require('./routes/routerCart');
require('dotenv').config();
const corsExtras = require('./cors');

const app = express();

const port = process.env.PORT || 8080;
const portFront = process.env.FRONT_PORT || 4800;

const corsOptions = {
  origin: `http://localhost:${portFront}`,
  optionsSuccessStatus: 200
};

app.use(corsExtras.permission)
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


app.use('/api/products', routerProducts);
app.use('/api/cart', routerCart);

// app.get('/', async (req, res) => {
//   try {
//     const something = { text: "hola" };
//     res.json({
//       status: 200,
//       message: "Get data ok from something",
//       something
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send('Server error');
//   }
// });

const server = app.listen(port, () => {
  console.log(`Listen to port: ${port} en http://localhost:${port}`);
});
server.on('error', error => console.log(`Server error: ${error}`));

module.exports = server;
