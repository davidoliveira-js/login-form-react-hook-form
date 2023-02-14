'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('users', [
      {
        email: 'joao@gmail.com',
        password: await bcrypt.hash('joao1234', 12),

        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'maria@gmail.com',
        password: await bcrypt.hash('maria1234', 12),

        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('users', null, {});
  },
};
