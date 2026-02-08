require("dotenv").config();
const { Sequelize } = require("sequelize");

// Menggunakan DATABASE_URL yang lebih simpel dan handal untuk Vercel
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
