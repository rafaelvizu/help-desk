import dbConn from "../database/db-conn";
import { DataTypes } from "sequelize";


const User = dbConn.define('User', {
     name: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     email: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     password: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     profileImage: {
          type: DataTypes.STRING,
          allowNull: true,
     },
});


export default User;