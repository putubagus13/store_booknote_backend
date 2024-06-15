import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/configs/database.config';

export default class Otp extends Model {
  declare id: string;
  declare codeOtp: number;
  declare type: string;
  declare email?: string;
  declare description?: string;
  declare expiredDt: Date;
  declare subject?: string;
  declare createdBy?: string;
  declare createdDt: Date;
  declare updatedBy?: string;
  declare updatedDt?: Date;
  declare deletedDt?: Date;
}

Otp.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      field: 'id',
    },
    codeOtp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'code_otp',
    },
    type: {
      type: DataTypes.STRING(250),
      allowNull: false,
      field: 'type',
    },
    email: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: 'email',
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
      field: 'description',
    },
    expiredDt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'expired_dt',
    },
    createdBy: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      field: 'created_by',
    },
    createdDt: {
      type: DataTypes.DATE,
      allowNull: false,
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
    tableName: 'otp',
    modelName: 'Otp',
  },
);
