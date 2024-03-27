"use strict";
import { Model } from "sequelize";

interface FavoriteAttributes {
  userId: number;
  favorite: object;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Favorite
    extends Model<FavoriteAttributes>
    implements FavoriteAttributes
  {
    userId!: number;
    favorite!: object;
    static associate(models: any) {
      Favorite.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Favorite.init(
    {
      userId: DataTypes.INTEGER,
      favorite: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Favorite",
      timestamps: false,
      tableName: "favorites",
    }
  );
  return Favorite;
};
