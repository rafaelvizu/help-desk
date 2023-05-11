import { DataTypes } from "sequelize";
import dbConn from "../database/db-conn";

import User from "./user";


const Client = dbConn.define('client', {
     nome: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     sexo: {
          type: DataTypes.ENUM('M', 'F'),
          allowNull: true,
     },
     dataNascimento: {
          type: DataTypes.DATE,
          allowNull: true,
     },
     endereco: {
          type: DataTypes.STRING,
          allowNull: true,
     },
     numero: {
          type: DataTypes.INTEGER,
          allowNull: true,
     },
     complemento: {
          type: DataTypes.STRING,
          allowNull: true,
     },
     bairro: {
          type: DataTypes.STRING,
          allowNull: true,
     },
     cidade: {
          type: DataTypes.STRING,
          allowNull: true,
     },
     estado: {
          type: DataTypes.STRING(2),
          allowNull: true,
     },
     cep: {
          type: DataTypes.STRING(7),
          allowNull: true,    
     },
     telefone_1: {
          type: DataTypes.STRING(11),
          allowNull: true,
     },
     telefone_2: {
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