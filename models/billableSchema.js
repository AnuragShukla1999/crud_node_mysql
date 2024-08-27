import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';

const Billable = sequelize.define('Billable', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    division: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    labourBurden: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    billableRate: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    }
}, {
    tableName: 'billable',
    timestamps: false,
});

export default Billable;
