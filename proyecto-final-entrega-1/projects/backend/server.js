const express = require('express');
const cors = require('cors');

const routerProducts = require('./routers/routerProducts');
const routerCart = require('./routers/routerCart');
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


app.use('/', routerProducts);
app.use('/', routerCart);

const server = app.listen(port, () => {
  console.log(`Listen to port: ${port} en http://localhost:${port}`);
});
server.on('error', error => console.log(`Server error: ${error}`));

module.exports = server;
