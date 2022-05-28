class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }

  addMascota(nombre) {
    this.mascotas.push(nombre);
    return this.mascotas;
  }

  countMascotas() {
    return this.mascotas.length ? this.mascotas.length : "No tiene mascotas.";
  }

  getBooks() {
    return this.libros.map((libro) => (libro = libro.nombre));
  }

  addBook(nombre, autor) {
    let books = this.getBooks();
    const found = books ? this.libros.find(book => book.nombre === nombre) : [];
    const verify = found 
    ? ['Ya existe otro libro con el mismo nombre'] 
    : [this.libros, this.libros.push({nombre, autor})];
    return verify[0];
  }
}

const persona = new Usuario(
  "Diego",
  "de la Vega",
  [
    { nombre: "Drácula", autor: "Bram Stoker" },
    { nombre: "Replicant number 8", autor: "Phillip Dick" },
  ],
  ["Gaia", "Rocco"]
);

const personita = new Usuario(
  "Morena",
  "Acosta Cucurull",
  [
    { nombre: "Harley Quinn", autor: "Paul Dini y Bruce Timm" },
    { nombre: "Birds of Prey", autor: "Christina Hodson" },
  ],
  ["Luna", "Pelotas"]
);

console.log("usuario", persona);
console.log("getFullName", persona.getFullName());
console.log("addMascotas", persona.addMascota("Ruthless"));
console.log("countMascotas", persona.countMascotas());
console.log("getBookNames", persona.getBooks());
console.log("addBooks", persona.addBook("El Señor de las moscas", "William Golding"));
console.log("addBooks", persona.addBook("Hannibal", "Thomas Harris"));
console.log("getBookNames", persona.getBooks());

console.log("usuario", personita);
console.log("getFullName", personita.getFullName());
console.log("addMascotas", personita.addMascota("Ruthless"));
console.log("countMascotas", personita.countMascotas());
console.log("getBookNames", personita.getBooks());
console.log("addBooks", personita.addBook("El Señor de las moscas", "William Golding"));
console.log("addBooks", personita.addBook("El Señor de las moscas", "William Golding"));
console.log("getBookNames", personita.getBooks());
