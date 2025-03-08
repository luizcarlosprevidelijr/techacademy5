import { DataTypes, INTEGER, Model } from "sequelize";
import sequelize from "../config/database";

class UserModel extends Model {
    id: number | undefined
    name: string | undefined
    email: string | undefined
    password: string | undefined
    cpf: string | undefined
}

UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
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
    }
},

{
    sequelize,
    modelName: 'UserModel',
    tableName: 'users'
}
)

export default UserModel