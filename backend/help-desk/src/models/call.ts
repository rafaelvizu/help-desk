import { DataTypes } from "sequelize";
import dbConn from "../database/db-conn";
import Client from "./client";
import User from "./user";


const Call = dbConn.define('call', {
     subject: {
          type: DataTypes.ENUM('SUPORTE', 'VISITA TÉCNICA', 'FINANCEIRO', 'OUTROS'),
          allowNull: false,
     },
     status: {
          type: DataTypes.ENUM('ABERTO', 'EM PROGRESSO', 'ATENDIDO'),
          allowNull: false,
     },
     complement: {
          type: DataTypes.STRING,
          allowNull: false,
     },
});

// um cliente pode ter vários chamados
Client.hasMany(Call, {
        foreignKey: {
          name: 'clientId',  
          allowNull: false,
     },
     onDelete: 'CASCADE',
     onUpdate: 'CASCADE',
});

// um chamado pertence a um cliente
Call.belongsTo(Client, {     
     foreignKey: {
          name: 'clientId',
          allowNull: false,
     },
     onDelete: 'CASCADE',
     onUpdate: 'CASCADE',
});


// um user pode ter vários chamados
User.hasMany(Call, {
     foreignKey: {
          name: 'userId',
          allowNull: false,
     },
     onDelete: 'CASCADE',
     onUpdate: 'CASCADE',
});

// um chamado pertence a um user
Call.belongsTo(User, {
     foreignKey: {
          name: 'userId',
          allowNull: false,
     },
     onDelete: 'CASCADE',
     onUpdate: 'CASCADE',
});


export default Call;