"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// 1. Inisialisasi Instance Model
const User = require("./User")(sequelize, DataTypes);
const Cafe = require("./Cafe")(sequelize, DataTypes);
const Review = require("./Review")(sequelize, DataTypes);
const UserCafeFavorite = require("./usercafefavorite")(sequelize, DataTypes);

const db = {
  sequelize,
  Sequelize: sequelize.Sequelize,
  User,
  Cafe,
  Review,
  UserCafeFavorite,
};

// --- 2. DEFINISI RELASI (HASMANY & BELONGSTO) ---

// Relasi User - Review: Agar fitur Profil bisa menampilkan daftar review
db.User.hasMany(db.Review, { foreignKey: "userId", as: "Review" });
db.Review.belongsTo(db.User, { foreignKey: "userId", as: "User" });

// Relasi Cafe - Review: Agar fitur Detail Kafe bisa menampilkan review pengunjung
db.Cafe.hasMany(db.Review, { foreignKey: "cafeId", as: "Review" });
db.Review.belongsTo(db.Cafe, { foreignKey: "cafeId", as: "Cafe" });

// --- 3. DEFINISI RELASI MANY-TO-MANY (FAVORITES) ---

db.User.belongsToMany(db.Cafe, {
  through: db.UserCafeFavorite,
  as: "FavoriteCafes",
  foreignKey: "userId",
});

db.Cafe.belongsToMany(db.User, {
  through: db.UserCafeFavorite,
  as: "FavoritedByUsers",
  foreignKey: "cafeId",
});

module.exports = db;
