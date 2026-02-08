// models/usercafefavorite.js
module.exports = (sequelize, DataTypes) => {
  const UserCafeFavorite = sequelize.define(
    "UserCafeFavorite",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Beritahu ini PK
      },
      cafeId: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Beritahu ini PK
      },
    },
    { timestamps: true },
  );
  return UserCafeFavorite;
};
