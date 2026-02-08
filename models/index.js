// models/index.js
"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Panggil fungsi model dan berikan instance sequelize
// models/index.js
const User = require("./User")(sequelize, DataTypes);
const Cafe = require("./Cafe")(sequelize, DataTypes);
const Review = require("./Review")(sequelize, DataTypes);
// PANGGIL INI AGAR TIDAK ERROR
const UserCafeFavorite = require("./usercafefavorite")(sequelize, DataTypes);

const db = {
  sequelize,
  Sequelize: sequelize.Sequelize,
  User,
  Cafe,
  Review,
  UserCafeFavorite, // Tambahkan ke objek db
};

// ... Definisi Relasi BelongsToMany ...
User.belongsToMany(Cafe, {
  through: UserCafeFavorite, // Gunakan instance modelnya langsung
  as: "FavoriteCafes",
  foreignKey: "userId",
});
Cafe.belongsToMany(User, {
  through: UserCafeFavorite, // Gunakan instance modelnya langsung
  as: "FavoritedByUsers",
  foreignKey: "cafeId",
});
