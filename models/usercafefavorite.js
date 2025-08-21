'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCafeFavorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserCafeFavorite.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    cafeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cafes',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'UserCafeFavorite',
  });
  return UserCafeFavorite;
};