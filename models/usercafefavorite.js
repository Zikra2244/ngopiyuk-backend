// models/usercafefavorite.js
module.exports = (sequelize, DataTypes) => {
  const UserCafeFavorite = sequelize.define(
    "UserCafeFavorite",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cafeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "UserCafeFavorites",
      timestamps: true, // Karena di migrasi ada createdAt dan updatedAt
    },
  );

  return UserCafeFavorite;
};
