const database = require('../models');

class Services {
  constructor(model) {
    this._model = model;
  }

  async getAllData(where = {}) {
    try {
      const data = await database[this._model].findAll({
        where: { ...where },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getOneData(where = {}) {
    try {
      return database[this._model].findOne({
        where: { ...where },
      });
    } catch (error) {
      return false;
    }
  }

  async createOneData(data, transaction = {}) {
    try {
      return database[this._model].create(data, transaction);
    } catch (error) {
      return false;
    }
  }

  async updateOneData(updatedData, id, transaction = {}) {
    try {
      return database[this._model].update(
        updatedData,
        { where: { id: id } },
        transaction
      );
    } catch (error) {
      return false;
    }
  }

  async deleteOneData(id, transaction = {}) {
    try {
      return database[this._model].destroy(
        {
          where: { id: id },
        },
        transaction
      );
    } catch (error) {
      return false;
    }
  }

  async restoreData(id) {
    try {
      return database[this._model].restore({ where: { id: id } });
    } catch (error) {
      return false;
    }
  }
}

module.exports = Services;
