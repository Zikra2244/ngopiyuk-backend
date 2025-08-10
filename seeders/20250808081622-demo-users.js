'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPasswordAdmin = await bcrypt.hash('admin123', 12);
    const hashedPasswordUser = await bcrypt.hash('user123', 12);

    return queryInterface.bulkInsert('Users', [{
        email: 'admin@ngopiyuk.com',
        password: hashedPasswordAdmin,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user@ngopiyuk.com',
        password: hashedPasswordUser,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};