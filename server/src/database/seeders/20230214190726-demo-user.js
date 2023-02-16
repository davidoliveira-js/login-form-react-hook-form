'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('users', [
      {
        email: 'admin@gmail.com',
        password: await bcrypt.hash('12345678', 12),
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'user@gmail.com',
        password: await bcrypt.hash('12345678', 12),
        role: 'user',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('users', null, {});
  },
};
