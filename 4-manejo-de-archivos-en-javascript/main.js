const fs = require('fs');

class Contenedor {
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
      await fs.promises.writeFile(this.nombreArchivo,JSON.stringify([],null,2));
      const contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
      contenido ? console.log("No existe el archivo y/o el listado, se ha generado el archivo.") : null;
      return JSON.parse(contenido);
    }
  }

  save = async (producto) => {
    const productos = await this.getAll();
    producto['id'] = productos.length + 1;
    productos.push(producto);
    // productos ? console.log("producto id: ", productos.length): null;

    try {
      await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(productos,null,2));
      const contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
      contenido ? console.log(contenido, 'Producto ID: ',producto['id']) : null;

      return contenido;
    } 
    catch (error) {
        throw new Error("No se pudo guardar")
    }
  }
  
  getById = async (id) => {
    const productos = await this.getAll();
    
    const productById = productos.find(p => p.id === id);
    // productById ? console.log('Se encontró:',productById) : null;
    return productById ? productById : null;
  }

  deleteById = async (id) => {
    const productos = await this.getAll();
    const productById = productos.find(p => p.id === id);
    let restoProductos = [];
    await productos.map(producto => {
      if(producto.id !== id) {
        console.log(producto);
        restoProductos.push(producto);
      }
    });
    // await console.log('total de Productos',restoProductos);
    // productById ? console.log('se borró', productById): console.log('NO se borró el producto o no existe');
    await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(restoProductos,null,2));
      return productById? console.log('Se borró el producto con ID:', id): console.log('No se encuentra el producto con ID:',id);
  }

  deleteAll = async () => {
    const productos = await this.getAll();
    if(productos.length) {

      await fs.promises.writeFile(this.nombreArchivo,'');
      productos ? console.log('Se borraron todos los productos!'): productos;
    }
    // return productos;
  }
}

module.exports = Contenedor;
// const productosDB = new Contenedor("productos");

// // PRUEBAS: comentar o descomentar la segunda linea para probar el metodo
// // yarn serve se ejecuta el script con nodemon
// // yarn start se ejecuta el script con node

// const test = async () => {

//   // save(Object) recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
//   // console.log("Guarda Producto", productosDB.save({title: "Hot Wheels", price: 30, thumbnail: "http://algo.com"}));
  
//   // getById(Number) recibe un id y devuelve el objeto con ese id, o null si no esta.
//   // console.log(await productosDB.getById(80));
//   // console.log(await productosDB.getById(8));
  
//   // getAll() devuelve un array con los objetos presentes en el archivo.
//   console.log(await productosDB.getAll());
  
//   // deleteById(Number) elimina del archivo el objeto con el id buscado.
//   // console.log(await productosDB.deleteById(8));
  
//   // deleteAll(Number) elimina todos los objetos presentes en el archivo.
//   // console.log(await productosDB.deleteAll());
// }

// test();
