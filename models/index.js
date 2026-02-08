// models/index.js
"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Panggil fungsi model dan berikan instance sequelize
const User = require("./User")(sequelize, DataTypes);
const Cafe = require("./Cafe")(sequelize, DataTypes);
const Review = require("./Review")(sequelize, DataTypes);

const db = {
  sequelize,
  Sequelize: sequelize.Sequelize,
  User,
  Cafe,
  Review,
};

// Definisikan Relasi
User.hasMany(Cafe, { foreignKey: "userId" });
Cafe.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });
Cafe.hasMany(Review, { foreignKey: "cafeId" });
Review.belongsTo(Cafe, { foreignKey: "cafeId" });

User.belongsToMany(Cafe, {
  through: "UserCafeFavorites",
  as: "FavoriteCafes",
  foreignKey: "userId",
});
Cafe.belongsToMany(User, {
  through: "UserCafeFavorites",
  as: "FavoritedByUsers",
  foreignKey: "cafeId",
});

module.exports = db;
