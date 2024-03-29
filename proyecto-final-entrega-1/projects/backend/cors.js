function corsPermission() {
  this.permission = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'OPTIONS');
    next();
  }
}

module.exports = new corsPermission();
