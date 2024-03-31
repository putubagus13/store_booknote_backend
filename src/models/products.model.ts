import { Model, DataTypes } from "sequelize";
import { sequelize } from "@/configs/database.config";

export default class Products extends Model {
  declare id: string;
  declare productName: string;
  declare quantity: number;
  declare price: number;
  declare description: string;
  declare categoryId: string;
  declare unitId: string;
  declare createdBy?: string;
  declare createdDt?: Date;
  declare updatedBy?: string;
  declare updatedDt?: Date;
  declare deletedDt?: Date;
}

Products.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    productName: {
      type: DataTypes.STRING(500),
      allowNull: false,
      field: "product_name",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "quantity",
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "price",
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
      field: "description",
    },
    categoryId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      field: "category_id",
    },
    unitId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      field: "unit_id",
    },
    createdBy: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      field: "created_by",
    },
    createdDt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn("current_timestamp"),
      field: "created_dt",
    },
    updatedBy: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      field: "updated_by",
    },
    updatedDt: {
      type: DataTypes.DATE(6),
      allowNull: true,
      field: "updated_dt",
    },
    deletedDt: {
      type: DataTypes.DATE(6),
      allowNull: true,
      field: "deleted_dt",
    },
  },
  {
    sequelize,
    modelName: "Products",
    tableName: "products",
  }
);
