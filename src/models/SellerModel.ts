import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class SellerModel extends Model {
  id: number | undefined
  name: string | undefined
  cpf: string | undefined
  position: string | undefined
  salary: string | undefined
  userId: number | undefined
}

SellerModel.init ({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        validate: {
            len: [11, 14]
        }
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    salary: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},

{
    sequelize,
    modelName: 'SellerModel',
    tableName: 'Sellers'
}
)

export default SellerModel