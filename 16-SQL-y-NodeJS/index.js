const express = require('express');
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { knex } = require('./options/sqlite3');

const routerProductos = require('./api/routerProductos');

require('dotenv').config();

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/layout', function (err) { });
app.set("views", "./views");
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 8080;

app.use('/', routerProductos);

app.get("/", (req, res) => {
  res.render('index');
});




io.on("connection", async (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);


  socket.emit("mensajes", await getMessages(knex, 'chat'));
  // carga mensaje, verifica si existen

  socket.on("mensajeNuevo", async (data) => {

    row = await insertProducts(knex, 'chat', data);
    if (row) {
      io.sockets.emit("mensajes", await getMessages(knex, 'chat'));
    }
  });

  socket.on("borrarMensajes", async (autor) => {
    mensajes = await getAutor(knex, 'chat', autor);
    // verifica que los mensajes sean del author
    io.sockets.emit("mensajes", await getMessages(knex, 'chat'));
  });
});

const server = httpServer.listen(port, () => {
  console.log(`Escuchando al puerto: ${port} en http://localhost:${port}`);
});
server.on('error', error => console.log(`Error en servidor${error}`));



const insertProducts = async (knex, table, mensaje) => {
  console.log('mensaje a enviar', mensaje)
  try {
    row = await knex(`${table}`).insert(mensaje);
    console.log('ROW', row);
  } catch (error) {
    console.log('Error', process.env.DB_CLIENT === 'mysql' ? error.sqlMessage : error);
  }
  console.log('mensaje agregado');
}

const getAutor = async (knex, table = 'chat', autor = null) => {
  try {
    rows = await knex.from(`${table}`).truncate();
  } catch (error) {
    console.log('Error', error);
  }
  return rows;
}

const getMessages = async (knex, table = 'chat', id = null) => {

  try {
    rows = id ? await knex.from(`${table}`).select('*').where({ id: id }) : await knex.from(`${table}`).select('*');
  } catch (error) {
    console.log('Error', process.env.DB_CLIENT === 'mysql' ? error.sqlMessage : error);
  }
  // rows.length ? console.log('Se cargaron los Mensajes') : console.log('No hay mensajes');
  return rows;
}