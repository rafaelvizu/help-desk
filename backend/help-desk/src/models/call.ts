import { DataTypes } from "sequelize";
import dbConn from "../database/db-conn";
import Cliente from "./client";


const Call = dbConn.define('call', {
     assunto: {
          type: DataTypes.ENUM('SUPORTE', 'VISITA TÉCNICA', 'FINANCEIRO', 'OUTROS'),
          allowNull: false,
     },
     status: {
          type: DataTypes.ENUM('ABERTO', 'EM PROGRESSO', 'ATENDIDO'),
          allowNull: false,
     },
     complemento: {
          type: DataTypes.STRING,
          allowNull: false,
     },
});

// um cliente pode ter vários chamados
Cliente.hasMany(Call, {
     foreignKey: {
          name: 'clienteId',  
          allowNull: false,
     },
     onDelete: 'CASCADE',
     onUpdate: 'CASCADE',
});

// um chamado pertence a um cliente
Call.belongsTo(Cliente, {     
     foreignKey: {
          name: 'clienteId',
          allowNull: false,
     },
     onDelete: 'CASCADE',
     onUpdate: 'CASCADE',
});


export default Call;