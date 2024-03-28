"use strict";
import { Model } from "sequelize";

interface FavoriteAttributes {
  id: number;
  userId: number;
  favorite: object;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Favorite
    extends Model<FavoriteAttributes>
    implements FavoriteAttributes
  {
    id!: number;
    userId!: number;
    favorite!: object;
    static associate(models: any) {
      Favorite.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Favorite.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      favorite: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Favorite",
      timestamps: false,
      tableName: "favorites",
    },
  );
  return Favorite;
};
