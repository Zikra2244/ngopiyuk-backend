// File: backend/config/database.js

const { Sequelize } = require('sequelize');

// Ganti 'password_anda' dengan password yang Anda buat saat instalasi
const sequelize = new Sequelize('ngopiyuk_db', 'postgres', 'Zikrafdly@123', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;