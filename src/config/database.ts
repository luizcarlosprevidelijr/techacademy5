import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'sistema_de_gestao_de_empresa',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

export default sequelize