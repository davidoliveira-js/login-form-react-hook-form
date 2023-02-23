'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('posts', [
      {
        title: 'Culinária',
        body: 'blablabla',
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Geopolítica',
        body: 'blablabla2',
        user_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Economia',
        body: 'blablabla3',
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('posts', null, {});
  },
};
