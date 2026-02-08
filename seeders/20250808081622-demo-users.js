"use strict";
const bcrypt = require("bcryptjs");
const SUPABASE_STORAGE_URL =
  "https://oeatryimhibggdwmfrvp.supabase.co/storage/v1/object/public/cafe-photos/avatars/";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPasswordAdmin = await bcrypt.hash("admin123", 12);
    const hashedPasswordUser = await bcrypt.hash("user123", 12);
    const hashedPasswordZikra = await bcrypt.hash("zikra123", 12);

    return queryInterface.bulkInsert("Users", [
      {
        username: "admin_ngopiyuk",
        email: "admin@ngopiyuk.com",
        password: hashedPasswordAdmin,
        role: "admin",
        avatar: `${SUPABASE_STORAGE_URL}admin-default.png`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user_ngopiyuk",
        email: "user@ngopiyuk.com",
        password: hashedPasswordUser,
        role: "user",
        avatar: `${SUPABASE_STORAGE_URL}user-default.png`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "zikra",
        email: "zikra@ngopiyuk.com",
        password: hashedPasswordZikra,
        role: "user",
        avatar: `${SUPABASE_STORAGE_URL}zikra-avatar.png`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "Users_id_seq" RESTART WITH 1;',
    );
  },
};
