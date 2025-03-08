import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

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

export default ClientModel