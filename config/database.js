// config/database.js
const pg = require("pg"); // TAMBAHKAN INI UNTUK MEMAKSA BUNDLER VERCEL
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg, // BERITAHU SEQUELIZE UNTUK MENGGUNAKAN MODULE INI
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    prepareThreshold: 0,
  },
});

module.exports = sequelize;
