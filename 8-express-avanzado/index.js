const express = require('express');
const routerProductos = require('./api/routerProductos');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 8080;

app.use('/', routerProductos);

const server = app.listen(port, () => {
  console.log(`Escuchando al puerto: ${port} en http://localhost:${port}`);
});
server.on('error', error => console.log(`Error en servidor${error}`));

module.exports = server;