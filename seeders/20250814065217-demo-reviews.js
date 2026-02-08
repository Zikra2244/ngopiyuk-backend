"use strict";

const SUPABASE_STORAGE_URL =
  "https://oeatryimhibggdwmfrvp.supabase.co/storage/v1/object/public/cafe-photos/";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Reviews", [
      {
        title: "Kopi Susunya Mantap!",
        description:
          "Kopi Susu Tetangga adalah yang terbaik. Manisnya pas dan kopinya berasa.",
        rating: 5,
        photoUrl:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
        cafeId: 1,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Tempatnya Enak buat Kerja",
        description:
          "Suasananya tenang dan wifinya kencang. Cocok banget buat WFC.",
        rating: 4,
        photoUrl:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
        cafeId: 2,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Rasa kopinya biasa saja",
        description:
          "Untuk harga segitu, ekspektasi saya lebih tinggi. Tempatnya oke tapi agak ramai.",
        rating: 3,
        photoUrl: null,
        cafeId: 1,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Suasana Sangat Nyaman",
        description: "Pelayanan cepat dan ramah. Dekorasinya juga estetik.",
        rating: 5,
        photoUrl: `${SUPABASE_STORAGE_URL}ReviewImage.jpeg`,
        cafeId: 1,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Reviews", null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "Reviews_id_seq" RESTART WITH 1;',
    );
  },
};
