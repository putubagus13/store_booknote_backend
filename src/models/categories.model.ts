import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/configs/database.config';
import ProductCategory from './product-category.model';
import Product from './product';
class Category extends Model {
  declare id: string;
  declare storeType: number;
  declare name: string;
  declare description?: string;
  declare createdBy?: string;
  declare createdDt?: Date;
  declare updatedBy?: string;
  declare updatedDt?: Date;
  declare deletedDt?: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      field: 'id',
    },
    storeType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'store_type',
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
    tableName: 'categories',
    modelName: 'Category',
  },
);

export default Category;
