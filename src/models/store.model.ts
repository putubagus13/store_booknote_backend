import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/configs/database.config';

export default class Store extends Model {
  declare id: string;
  declare name: string;
  declare storeImageUrl?: string;
  declare storeType?: number;
  declare description: string;
  declare createdBy?: string;
  declare createdDt?: Date;
  declare updatedBy?: string;
  declare updatedDt?: Date;
  declare deletedDt?: Date;
}

Store.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      field: 'id',
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: false,
      field: 'name',
    },
    storeImageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'store_image_url',
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'description',
    },
    storeType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'store_type',
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
    tableName: 'store',
    modelName: 'Store',
  },
);
