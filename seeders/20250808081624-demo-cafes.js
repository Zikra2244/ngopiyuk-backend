"use strict";

const SUPABASE_STORAGE_URL =
  "https://oeatryimhibggdwmfrvp.supabase.co/storage/v1/object/public/cafe-photos/";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Cafes", [
      {
        name: "Kopi Tuku",
        address: "Jl. Cipete Raya No. 7, Jakarta Selatan",
        latitude: -6.2633,
        longitude: 106.8055,
        photoUrl: `${SUPABASE_STORAGE_URL}KopiTuku.jpeg`,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Anomali Coffee",
        address: "Jl. Senopati No. 19, Jakarta Selatan",
        latitude: -6.2349,
        longitude: 106.8087,
        photoUrl: `${SUPABASE_STORAGE_URL}AnomaliCoffee.jpeg`,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Giyanti Coffee Roastery",
        address: "Jl. Surabaya No. 20, Menteng, Jakarta Pusat",
        latitude: -6.2,
        longitude: 106.8409,
        photoUrl: `${SUPABASE_STORAGE_URL}GiyantiCoffee.jpeg`,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Cafes", null, {});
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "Cafes_id_seq" RESTART WITH 1;',
    );
  },
};
