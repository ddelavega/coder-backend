import { promises as fs } from 'fs';

class ContainersFile {

  constructor(path) {
    this.path = path;
  }

  async gets(id) {
    const elems = await this.getAll();
    const finds = elems.find(e => e.id === id);
    return finds;
  }

  async getAll() {
    try {
      const elems = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(elems);
    } catch (error) {
      return [];
    }
  }

  async save(elem) {
    const elems = await this.getAll();

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
}

module.exports = ContainersFile;