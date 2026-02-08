const { Sequelize } = require("sequelize");
require("dotenv").config();

// Gunakan DATABASE_URL yang berisi string lengkap dari Supabase
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

module.exports = sequelize;
