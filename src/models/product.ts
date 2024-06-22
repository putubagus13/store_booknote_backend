import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/configs/database.config';

export default class Product extends Model {
  declare id: string;
  declare name: string;
  declare description?: string;
  declare price: number;
  declare imageUrl: string;
  declare stock: number;
  declare unit: string;
  declare storeId: string;
  declare createdBy?: string;
  declare createdDt?: Date;
  declare updatedBy?: string;
  declare updatedDt?: Date;
  declare deletedDt?: Date;
  declare dataStatus?: Date;
}

Product.init(
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
    description: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'description',
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'image_url',
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'price',
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'stock',
    },
    unit: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      field: 'unit',
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
    dataStatus: {
      type: DataTypes.DATE(6),
      allowNull: true,
      field: 'data_status',
    },
  },
  {
    sequelize,
    tableName: 'product',
    modelName: 'Product',
  },
);
