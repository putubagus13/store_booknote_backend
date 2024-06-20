import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/configs/database.config';

export default class Journal extends Model {
  declare id: string;
  declare status: string;
  declare amount: number;
  declare storeId: string;
  declare createdBy?: string;
  declare createdDt?: Date;
  declare updatedBy?: string;
  declare updatedDt?: Date;
  declare deletedDt?: Date;
}

Journal.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      field: 'id',
    },
    status: {
      type: DataTypes.ENUM('DEBIT', 'CREDIT'),
      allowNull: false,
      field: 'status',
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'amount',
    },
    storeId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      field: 'store_id',
    },
    createdBy: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      field: 'created_by',
    },
    createdDt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(),
      field: 'created_dt',
    },
    updatedBy: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      field: 'updated_by',
    },
    updatedDt: {
      type: DataTypes.DATE(6),
      allowNull: true,
      field: 'updated_dt',
    },
    deletedDt: {
      type: DataTypes.DATE(6),
      allowNull: true,
      field: 'deleted_dt',
    },
  },
  {
    sequelize,
    tableName: 'journal',
    modelName: 'Journal',
  },
);
