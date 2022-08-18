var express = require('express');
var cors = require('cors');
var path = require('path')

require('dotenv').config();
var corsExtras = require('./cors');

var app = express();

var port = process.env.PORT || 8080;
var portFront = process.env.FRONT_PORT || 4800;

var corsOptions = {
  origin: 'https://protected-chamber-96722.herokuapp.com/',
  optionsSuccessStatus: 200
};

app.use(corsExtras.permission)
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/dist/uikit'));


// app.use('/api/products', routerProducts);
// app.use('/api/cart', routerCart);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/uikit/index.html'))
});

var server = app.listen(port || 3000, function () {
  console.log('Listen to port: 3000');
});
// server.on('error', error { console.log(`Server error: ${error}`)});

module.exports = server;
