const fs = require('fs');
class DbPersist {

  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
    // console.log("this", this,this.nombreArchivo);
  }

  getAll = async () => {
    try {
      const contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
      // contenido ? console.log("Listado de productos:") : null;
      return JSON.parse(contenido);
    }
    catch (error) {
      await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([], null, 2));
      const contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
      contenido ? console.log(`No existe el archivo ${this.nombreArchivo} y/o el listado, se ha generado el archivo.`) : null;
      return JSON.parse(contenido);
    }
  }

  save = async (producto) => {
    const productos = await this.getAll();
    producto['id'] = String(Date.now()); // to avoid reps or uuid
    productos.push(producto);
    await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos, null, 2));
    try {
      const products = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
      return { error: false, products };
    }
    catch (error) {
      throw new Error("No se pudo guardar")
    }
  }

  updateById = async (id, edited) => {
    const products = await this.getAll();
    const productIndex = products.findIndex((e) => e.id == id);
    if (productIndex === -1) return { error: true };
    products[productIndex] = {
      ...products[productIndex],
      ...edited,
    };
    await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(products, null, 2));
    try {
      const products = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
      return { error: false, products };
    }
    catch (error) {
      throw new Error("No se pudo editar")
    }
  }

  deleteById = async (id) => {
    const productos = await this.getAll();
    const productById = productos.find(p => p.id === id);
    console.log('id', parseInt(id), 'productById', productById, productById.id);
    let restoProductos = [];
    await productos.map(producto => {
      console.log('producto.id', producto.id);
      if (producto.id !== id) {
        console.log(producto);
        restoProductos.push(producto);
      }
    });
    await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(restoProductos, null, 2));
    try {
      const products = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
      return { error: false, products };
    }
    catch (error) {
      throw new Error(`No se pudo borrar el item ${id}`);
    }
  }
  // deleteById(id) {
  //   const elementIndex = this.elements.findIndex((e) => e.id == id);

  //   if (elementIndex === -1) return { error: true };

  //   this.elements = this.elements.filter((e) => e.id != id);

  //   return { error: false };
  // }

  // getAll() {
  //   return this.elements;
  // }

  // getById(id) {
  //   const element = this.elements.find((e) => e.id == id);

  //   return element;
  // }

  // save(element) {
  //   element.id =
  //     this.elements.length === 0
  //       ? 1
  //       : this.elements[this.elements.length - 1].id + 1;

  //   this.elements.push(element);

  //   return element;
  // }

  // updateById(id, newData) {
  //   const elementIndex = this.elements.findIndex((e) => e.id == id);

  //   if (elementIndex === -1) return { error: true };

  //   this.elements[elementIndex] = {
  //     ...this.elements[elementIndex],
  //     ...newData,
  //   };

  //   return this.elements[elementIndex];
  // }

  // deleteById(id) {
  //   const elementIndex = this.elements.findIndex((e) => e.id == id);

  //   if (elementIndex === -1) return { error: true };

  //   this.elements = this.elements.filter((e) => e.id != id);

  //   return { error: false };
  // }
}

// export { DbPersist }; // type module

module.exports = { DbPersist } // type commonjs (por defecto)
