import { Sequelize } from "sequelize";
import 'dotenv/config';

const credentials = {
     database: process.env.DB_NAME as string,
     username: process.env.DB_USER as string ,
     password: process.env.DB_PASS as string,
     host: process.env.DB_HOST as string,
};

const dbConn: Sequelize = new Sequelize(credentials.database, credentials.username, credentials.password, {
     host: credentials.host,
     dialect: 'mysql',
     logging: false,
});


export default dbConn;