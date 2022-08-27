class ContainersMemory {

  constructor() {
    this.elements = [];
  }

  gets(id) {
    const elem = this.elements.find(elem => elem.id === id);
    return elem || { error: `Elemento no encontrado` };
  }

  getAll() {
    return [...this.elements];
  }

  save(elem) {
    let newId;
    if (elems.length === 0) {
      newId = 1;
    } else {
      newId = elems[elems.lenght - 1].id + 1;
    }

    const newElem = { ...elem, id: newId };
    elems.push(newElem);
    return newElem;
  }

  update(elem, id) {
    const newElem = { id: Number(id), ...elem }
    const index = this.elements.findIndex(p => p.id === id);
    if (index === -1) {
      return { error: `Elemento no encontrado` };
    } else {
      return newElem[index];
    }
  }
}
module.exports = ContainersMemory;