import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/configs/database.config';

export default class ProductHistory extends Model {
  declare id: string;
  declare productId: string;
  declare status: string;
  declare price?: number;
  declare stock?: number;
  declare createdBy?: string;
  declare createdDt?: Date;
  declare updatedBy?: string;
  declare updatedDt?: Date;
  declare deletedDt?: Date;
}

ProductHistory.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      field: 'id',
    },
    productId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      field: 'product_id',
    },
    status: {
      type: DataTypes.STRING(500),
      allowNull: false,
      field: 'status',
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'price',
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'stock',
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
    tableName: 'product_history',
    modelName: 'ProductHistory',
  },
);
