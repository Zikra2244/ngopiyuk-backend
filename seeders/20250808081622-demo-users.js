"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  // FUNGSI 'up' ANDA SUDAH BENAR, JANGAN DIUBAH
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
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user_ngopiyuk",
        email: "user@ngopiyuk.com",
        password: hashedPasswordUser,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "zikra",
        email: "zikra@ngopiyuk.com",
        password: hashedPasswordZikra,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  // ==========================================================
  // GANTI FUNGSI 'down' LAMA ANDA DENGAN YANG BARU INI
  // ==========================================================
  down: async (queryInterface, Sequelize) => {
    // Langkah 1: Hapus semua data dari tabel Users
    await queryInterface.bulkDelete("Users", null, {});

    // Langkah 2 (PENTING): Reset auto-increment ID kembali ke 1
    // Perintah ini khusus untuk PostgreSQL
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "Users_id_seq" RESTART WITH 1;'
    );
  },
};
