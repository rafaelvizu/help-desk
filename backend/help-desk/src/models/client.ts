import { DataTypes } from "sequelize";
import dbConn from "../database/db-conn";

import User from "./user";


const Client = dbConn.define('client', {
     name: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     gender: {
          type: DataTypes.ENUM('M', 'F', 'N/A'),
          allowNull: true,
     },
     dateBirth: {
          type: DataTypes.DATE,
          allowNull: true,
     },
     address: {
          type: DataTypes.STRING,
          allowNull: true,
     },
     number: {
          type: DataTypes.INTEGER,
          allowNull: true,
     },
     complement: {
          type: DataTypes.STRING,
          allowNull: true,
     },
     district: {
          type: DataTypes.STRING,
          allowNull: true,
     },
     city: {
          type: DataTypes.STRING,
          allowNull: true,
     },
     state: {
          type: DataTypes.STRING(2),
           allowNull: true,
     },
     cep: {
          type: DataTypes.STRING(8),
          allowNull: true,    
     },
     phone_1: {
          type: DataTypes.STRING(11),
          allowNull: true,
     },
     phone_2: {
          type: DataTypes.STRING(11),
          allowNull: true,
     },
     email: {
          type: DataTypes.STRING,
          allowNull: true,
     },
     cpf: {
          type: DataTypes.STRING(11),
          allowNull: true,
     },
     cnpj: {
          type: DataTypes.STRING(14),
          allowNull: true,
     },
});

// um user pode ter muitos clientes
User.hasMany(Client, {
     foreignKey: {
          name: 'userId',
          allowNull: false,
     },
     onDelete: 'CASCADE',
     onUpdate: 'CASCADE',
});

// um cliente pertence a um user   
Client.belongsTo(User, {
     foreignKey: {
          name: 'userId',
          allowNull: false,
     },
     onDelete: 'CASCADE',
     onUpdate: 'CASCADE',
});


export default Client;