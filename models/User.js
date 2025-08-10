// backend/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Setiap email harus unik
    validate: {
      isEmail: true, // Memastikan formatnya adalah email
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'), // Peran hanya bisa 'user' atau 'admin'
    allowNull: false,
  }
}, {
  tableName: 'Users'
});

module.exports = User;