import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/configs/database.config';
import Product from './product';
import Categories from './categories.model';
import Category from './categories.model';

class ProductCategory extends Model {
  declare id: string;
  declare productId: string;
  declare categoryId: string;
  declare createdBy?: string;
  declare createdDt?: Date;
  declare updatedBy?: string;
  declare updatedDt?: Date;
  declare deletedDt?: Date;
}

ProductCategory.init(
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
    categoryId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      field: 'category_id',
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
    tableName: 'product_category',
    modelName: 'ProductCategory',
  },
);

export default ProductCategory;
