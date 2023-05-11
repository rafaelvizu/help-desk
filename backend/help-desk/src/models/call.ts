import { DataTypes } from "sequelize";
import dbConn from "../database/db-conn";
import Cliente from "./client";


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
Cliente.hasMany(Call, {
     foreignKey: {
          name: 'clientId',  
          allowNull: false,
     },
     onDelete: 'CASCADE',
     onUpdate: 'CASCADE',
});

// um chamado pertence a um cliente
Call.belongsTo(Cliente, {     
     foreignKey: {
          name: 'clientId',
          allowNull: false,
     },
     onDelete: 'CASCADE',
     onUpdate: 'CASCADE',
});


export default Call;