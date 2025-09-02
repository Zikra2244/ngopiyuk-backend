"use strict";

module.exports = {
  // FUNGSI 'up' ANDA SUDAH BENAR, JANGAN DIUBAH
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Reviews", [
      {
        title: "Kopi Susunya Mantap!",
        description:
          "Kopi Susu Tetangga adalah yang terbaik. Manisnya pas dan kopinya berasa. Selalu jadi pilihan utama kalau lagi di daerah Cipete.",
        rating: 5,
        photoUrl: "https://source.unsplash.com/400x300/?coffee,cup",
        cafeId: 1,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Tempatnya Enak buat Kerja",
        description:
          "Suasananya tenang dan wifinya kencang. Cocok banget buat WFC (Work From Cafe). Pilihan biji kopinya juga banyak.",
        rating: 4,
        photoUrl: "https://source.unsplash.com/400x300/?cafe,laptop",
        cafeId: 2,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Rasa kopinya biasa saja",
        description:
          "Untuk harga segitu, ekspektasi saya lebih tinggi. Mungkin saya salah pesan menu. Tempatnya oke tapi agak ramai.",
        rating: 3,
        photoUrl: null,
        cafeId: 1,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Niger",
        description: "Negro",
        rating: 1,
        photoUrl: "uploads/images/oranghitam.jpeg",
        cafeId: 1,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  // ==========================================================
  // GANTI FUNGSI 'down' LAMA ANDA DENGAN YANG BARU INI
  // ==========================================================
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Reviews", null, {});
    // Perintah ini akan mereset ID Reviews kembali ke 1
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "Reviews_id_seq" RESTART WITH 1;'
    );
  },
};
