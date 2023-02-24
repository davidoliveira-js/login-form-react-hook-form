const { Op } = require('sequelize');
const database = require('../models');

class Services {
  constructor(model) {
    this._model = model;
  }

  async getAllData({
    where = {},
    order = ['id', 'ASC'],
    offset,
    limit,
  }) {
    try {
      const data = await database[this._model].findAll({
        where: { ...where },
        order: [order],
        offset: offset,
        limit: limit,
      });

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAndCountAllData({
    where = {},
    order = ['id', 'ASC'],
    offset,
    limit,
  }) {
    try {
      const data = await database[this._model].findAndCountAll({
        where: { ...where },
        order: [order],
        offset: offset,
        limit: limit - offset,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getOneData(where = {}) {
    try {
      return database[this._model].findOne({
        where: { ...where },
      });
    } catch (error) {
      throw error;
    }
  }

  async createOneData(data, transaction = {}) {
    try {
      return database[this._model].create(data, transaction);
    } catch (error) {
      throw error;
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
      throw error;
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
      throw error;
    }
  }

  async restoreData(id) {
    try {
      return database[this._model].restore({ where: { id: id } });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Services;
