import knex from 'knex';

class ContainersSQL {

  constructor(config, table) {
    this.knex = knex(config);
    this.table = table;
  }

  async gets(id) {
    try {
      return this.knex.select('*').from(this.table).where('id', id);
    } catch (error) {
      throw new Error(`Error al obtener por id: ${error}`);
    }
  }

  async getAll() {
    try {
      return this.knex.select('*').from(this.table);
    } catch (error) {
      throw new Error(`Error al obtener todo: ${error}`);
    }
  }

  async save(elem) {
    try {
      return this.knex.insert(elem).into(this.table);
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async update(elem, id) {
    try {
      return this.knex.from(this.table).where('id', id).update(elem);
    } catch (error) {
      throw new Error(`Error al actualizar: ${error}`);
    }
  }

  async delete(id) {
    try {
      return this.knex.delete().from(this.table).where('id', id);
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async deleteAll() {
    try {
      return this.knex.delete().from(this.table);
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

}
export default ContainersSQL;