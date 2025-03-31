import { DataTypes, INTEGER, Model } from "sequelize";
import sequelize from "../config/database";
import UserModel from "./UserModel";

class ProductModel extends Model {
  id: number | undefined;
  name: string | undefined;
  description: string | undefined;
  price: string | undefined;
  userId: number | undefined;
}

ProductModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize,
    modelName: "ProductModel",
    tableName: "products",
  }
);

ProductModel.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "user",
});

UserModel.hasMany(ProductModel, {
  foreignKey: "userId",
  as: "user",
});

export default ProductModel;
