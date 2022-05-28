const fs = require("fs");

class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }

  getAll = async () => {
    try {
      const contenido = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      return JSON.parse(contenido);
    } catch (error) {
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify([], null, 2)
      );
      const contenido = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      contenido
        ? console.log(
            "No existe el archivo y/o el listado, se ha generado el archivo."
          )
        : null;
      return JSON.parse(contenido);
    }
  };

  getRandom = async () => {
    let items = await this.getAll();
    let productoRandom = items[(items.length * Math.random()) | 0];
    return productoRandom;
  };

  save = async (producto) => {
    const productos = await this.getAll();
    const productoExistente = productos.find(
      (prod) => prod.title === producto.title
    );
    if (!productoExistente) {
      let idX = 0;
      productos.length
        ? (idX = productos[productos.length - 1].id + 1)
        : (idX = 1);
      productos.push({ ...producto, id: idX });
      try {
        await fs.promises.writeFile(
          this.nombreArchivo,
          JSON.stringify(productos, null, 2)
        );
        const contenido = await fs.promises.readFile(
          this.nombreArchivo,
          "utf-8"
        );
        contenido ? console.log(contenido, "Producto ID: ", idX) : null;
        return contenido;
      } catch (error) {
        throw new Error("No se pudo guardar");
      }
    } else {
      console.log(`El producto con id ${productoExistente.id} ya existe!`);
    }
  };

  getById = async (id) => {
    const productos = await this.getAll();
    const productById = productos.find((p) => p.id === id);
    return productById ? productById : null;
  };

  deleteById = async (id) => {
    const productos = await this.getAll();
    const productById = productos.find((p) => p.id === id);
    let restoProductos = [];
    await productos.map((producto) => {
      if (producto.id !== id) {
        console.log(producto);
        restoProductos.push(producto);
      }
    });
    await fs.promises.writeFile(
      this.nombreArchivo,
      JSON.stringify(restoProductos, null, 2)
    );
    return productById
      ? console.log("Se borró el producto con ID:", id)
      : console.log("No se encuentra el producto con ID:", id);
  };

  deleteAll = async () => {
    const productos = await this.getAll();
    if (productos.length) {
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify([], null, 2)
      );
      console.log("Se borraron todos los productos!");
    } else {
      console.log("No hay productos disponibles");
    }
  };
}

module.exports = Contenedor;
