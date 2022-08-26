const express = require('express');
const routerProductos = require('./../api/routerProductos');
require('dotenv').config();

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));



const port = process.env.PORT || 8081;

app.use('/', routerProductos);

// app.get("/", (req, res) => {
//   res.render('index');
// });

const server = app.listen(port, () => {
  console.log(`Escuchando al puerto: ${port} en http://localhost:${port}`);
});
server.on('error', error => console.log(`Error en servidor${error}`));

module.exports = server;