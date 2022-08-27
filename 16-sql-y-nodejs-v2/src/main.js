import express from 'express';
import 'dotenv/config'
import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';
import ContainersSQL from './containers/ContainersSQL.js';
import config from './config.js'
import { default as hbs } from 'hbs';
import routerProductos from './../API/routerProductos.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
console.log('directory-name 👉️', __dirname);


const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);


const productsAPI = new ContainersSQL(config.mariaDb, 'products');
const messagesAPI = new ContainersSQL(config.sqlite3, 'messages');

io.on('connection', async (socket) => {
  // console.log(`Nuevo cliente conectado ${socket.id}`);
  const order = io.engine.clientsCount;
  console.log(' #%s socket connected', order, socket.id);

  socket.on('disconnect', function () {
    console.log("disconnect: #%s", order, socket.id);
  });


  socket.emit('products', await productsAPI.getAll());
  socket.on('update', async (product) => {
    await productsAPI.save(product);
    io.sockets.emit('products', await productsAPI.getAll());
  });

  socket.emit('messages', await messagesAPI.getAll());

  socket.on('updateMsg', async (message) => {
    message.date = new Date().toLocaleString();
    await messagesAPI.save(message);
    io.sockets.emit('messages', await messagesAPI.getAll());
  });

  socket.on('deleteMessages', async () => {
    await messagesAPI.deleteAll();
    // verifica que los mensajes sean del author
    io.sockets.emit('messages', await messagesAPI.getAll());
  });
});

// Middlewares
console.log('HOLA')

// hbs.registerPartials('./views/layout', function (err) { });
// app.set('views', './views');
// app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname + './../views/layout'), function (err) { });
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname + "./../views"));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('./../public/'));
app.use(express.static(path.join(__dirname + "./../public")));

app.use('/', routerProductos);
app.get('/', (req, res) => {
  res.render('index', {});
});
app.get('/productos', (req, res) => {
  res.render('productos');
});
// app.use('/css', express.static(path.join(__dirname + "./../public/css")));

const PORT = 8080;

const connectedServer = httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}, en http://localhost:${PORT}`);
});
connectedServer.on('error', error => console.log(`Error en servidor${error}`));
