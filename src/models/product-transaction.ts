import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/configs/database.config';

export default class ProductTransaction extends Model {
  declare id: string;
  declare productId: string;
  declare storeId: string;
  declare paymentMethod: string;
  declare amount: number;
  declare productQuantity: number;
  declare createdBy?: string;
  declare createdDt?: Date;
  declare updatedBy?: string;
  declare updatedDt?: Date;
  declare deletedDt?: Date;
}

ProductTransaction.init(
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
    storeId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      field: 'store_id',
    },
    paymentMethod: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      field: 'payment_method',
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'amount',
    },
    productQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'product_quantity',
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
    tableName: 'product_transaction',
    modelName: 'ProductTransaction',
  },
);
