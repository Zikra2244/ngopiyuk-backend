const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  // PENTING: Tambahkan baris ini untuk mendukung Transaction Pooler Supabase
  minifyAliases: true,
  // Disable prepared statements
  prepareThreshold: 0,
  logging: false,
});

module.exports = sequelize;
