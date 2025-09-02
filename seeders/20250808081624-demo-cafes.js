"use strict";

module.exports = {
  // FUNGSI 'up' ANDA SUDAH BENAR, JANGAN DIUBAH
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Cafes", [
      {
        name: "Kopi Tuku",
        address: "Jl. Cipete Raya No. 7, Jakarta Selatan",
        latitude: -6.2633,
        longitude: 106.8055,
        photoUrl: "uploads/images/KopiTuku.jpeg",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Anomali Coffee",
        address: "Jl. Senopati No. 19, Jakarta Selatan",
        latitude: -6.2349,
        longitude: 106.8087,
        photoUrl: "uploads/images/AnomaliCoffee.jpeg",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Giyanti Coffee Roastery",
        address: "Jl. Surabaya No. 20, Menteng, Jakarta Pusat",
        photoUrl: "uploads/images/GiyantiCoffee.jpeg",
        userId: 1,
        latitude: -6.2,
        longitude: 106.8409,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  // ==========================================================
  // GANTI FUNGSI 'down' LAMA ANDA DENGAN YANG BARU INI
  // ==========================================================
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Cafes", null, {});
    // Perintah ini akan mereset ID Cafes kembali ke 1
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "Cafes_id_seq" RESTART WITH 1;'
    );
  },
};
