// backend/models/index.js

const sequelize = require('../config/database');

const Cafe = require('./Cafe');
const User = require('./User');

const db = {
  sequelize,
  Sequelize: sequelize.Sequelize,
  Cafe,
  User,
};

// Di sini kita akan mendefinisikan relasi antar model di masa depan
// Contoh:
// User.hasMany(Review);
// Review.belongsTo(User);

module.exports = db;