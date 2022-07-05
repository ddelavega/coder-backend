const express = require('express');
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const routerProductos = require('./api/routerProductos');

require('dotenv').config();

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/layout', function (err) {});
app.set("views", "./views");
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 8080;

app.use('/', routerProductos);

app.get("/", (req, res) => {
  res.render('index');
});

let mensajes = [];

io.on("connection", (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);

  socket.emit("mensajes", mensajes);

  socket.on("mensajeNuevo", (data) => {
    mensajes.push(data);
    console.log('data', data);

    io.sockets.emit("mensajes", mensajes);
  });
  socket.on("borrarMensajes", (autor) => {
    mensajes = mensajes.filter((m) => m.autor !== autor);
    io.sockets.emit("mensajes", mensajes);
  });
});

const server = httpServer.listen(port, () => {
  console.log(`Escuchando al puerto: ${port} en http://localhost:${port}`);
});
server.on('error', error => console.log(`Error en servidor${error}`));



