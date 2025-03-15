import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import SellerModel from "./SellerModel";

class ClientModel extends Model {
  id: number | undefined
  name: string | undefined
  contact: string | undefined
  cpf: string | undefined
  SellerId: number | undefined
}

ClientModel.init ({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact: {
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
},
{
    sequelize,
    modelName: 'ClientModel',
    tableName: 'Clients'
}
)

ClientModel.belongsTo(SellerModel, {
    foreignKey: 'sellerId', 
    as: 'clientSeller' 
})

SellerModel.hasMany(ClientModel, {
    foreignKey: 'sellerId', 
    as: 'clients'
})


export default ClientModel