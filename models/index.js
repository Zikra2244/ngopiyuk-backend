const sequelize = require('../config/database');
const Cafe = require('./Cafe');
const User = require('./User');
const Review = require('./Review');

const db = { sequelize, Sequelize: sequelize.Sequelize, Cafe, User, Review };

User.hasMany(Review, { foreignKey: 'userId' });
User.hasMany(Cafe, { foreignKey: 'userId' });
Cafe.belongsTo(User, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });
Cafe.hasMany(Review, { foreignKey: 'cafeId' });
Review.belongsTo(Cafe, { foreignKey: 'cafeId' });

module.exports = db;