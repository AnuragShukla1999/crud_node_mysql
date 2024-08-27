import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';

const Actual = sequelize.define('Actual', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  actuals_pm: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  qb_project_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  month: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  year: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  file_name: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  poc: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  others: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM('ACTIVE', 'ARCHIVE', 'OTHER'),
    allowNull: false,
    defaultValue: 'ACTIVE',
  }
}, {
  tableName: 'actuals',
  timestamps: false, // Disables `createdAt` and `updatedAt` fields if not needed.
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
});

export default Actual;
