const fs = require('fs');

class CartDbPersist {

  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
    // console.log("this", this,this.nombreArchivo);
  }

  defaultCart = {
    id: "1658269276051",
    timestamp: Date.now(),
    products: []
  };

  getAll = async () => {
    try {
      const contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
      // contenido ? console.log("Listado de productos:") : null;
      return JSON.parse(contenido);
    }
    catch (error) {
      await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([this.defaultCart], null, 2));
      const contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
      contenido ? console.log(`No existe el archivo ${this.nombreArchivo} y/o el listado, se ha generado el archivo.`) : null;
      return JSON.parse(contenido);
    }
  }

  save = async (cart) => {
    const carts = await this.getAll();
    carts.push(cart);
    await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(carts, null, 2));
    try {
      const carts = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
      return { error: false, carts };
    }
    catch (error) {
      throw new Error("No se pudo crear")
    }
  }


  getById = async (id) => {
    const carts = await this.getAll();
    const cartIndex = carts.findIndex((e) => e.id === id);
    if (cartIndex === -1) return { error: true };
    const cart = carts[cartIndex];
    try {
      return { error: false, cart };
    }
    catch (error) {
      throw new Error(`No se encontró cart con id: ${id}`)
    }
  }

  getProductsByCartId = async (id) => {
    let carts = await this.getAll();
    const cartIndex = carts.findIndex((e) => e.id === id);
    console.log('cartIndex', cartIndex, carts);
    if (cartIndex === -1) return { error: true };
    const products = carts[cartIndex].products;

    try {
      return { error: false, products };
    }
    catch (error) {
      throw new Error(`No se encontró cart con id: ${id}`)
    }
  }

  updateByCartId = async (id, cartToSend) => {
    console.log('UPDATE BY ID', 'id', id, 'cartToSend', cartToSend);
    let carts = await this.getAll();
    console.log(id, cartToSend);

    const cartIndex = await carts.findIndex((e) => e.id === id);

    console.log('cartIndex', cartIndex);
    if (cartIndex === -1) return { error: true };

    carts[cartIndex] = cartToSend;
    console.log('cartS CARTS', carts, cartToSend);

    await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(carts, null, 2));
    const cartx = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
    try {
      return { error: false, cartx };
    }
    catch (error) {
      throw new Error("No se pudo editar")
    }
  }

  deleteById = async (id) => {
    const carts = await this.getAll();
    const cartById = carts.find(p => p.id === id);
    console.log('id', parseInt(id), 'cartById', cartById, cartById.id);
    let restoCarts = [];
    await carts.map(cart => {
      console.log('cart.id', cart.id);
      if (cart.id !== id) {
        console.log(cart);
        restoCarts.push(cart);
      }
    });
    await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(restoCarts, null, 2));
    try {
      const carts = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
      return { error: false, carts };
    }
    catch (error) {
      throw new Error(`No se pudo borrar el item ${id}`);
    }
  }

  deleteProductFromCart = async (id, id_product) => {
    const carts = await this.getAll();
    const cartIndex = carts.findIndex((e) => e.id === id);
    console.log('id', parseInt(id), 'cartIndex', cartIndex, carts);

    if (cartIndex !== -1) {
      const productIndex = carts[cartIndex].products.findIndex(p => p.id === id_product);
      console.log('productIndex', productIndex, cartIndex);
      if (productIndex !== -1) {
        carts[cartIndex].products.splice(productIndex, 1);
      }
    }
    console.log('carts', carts);
    await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(carts, null, 2));
    try {
      const carts = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
      return { error: false, carts };
    }
    catch (error) {
      throw new Error(`No se pudo borrar el item ${id}`);
    }
  }
}

module.exports = { CartDbPersist } // type commonjs (por defecto)
