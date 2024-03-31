import { Model, DataTypes } from "sequelize";
import { sequelize } from "@/configs/database.config";

export default class ProductStore extends Model {
  declare id: string;
  declare productId: string;
  declare storeId: string;
  declare createdBy?: string;
  declare createdDt?: Date;
  declare updatedBy?: string;
  declare updatedDt?: Date;
  declare deletedDt?: Date;
}

ProductStore.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    productId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      field: "product_id",
    },
    storeId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      field: "store_id",
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
    tableName: "product_store",
    modelName: "ProductStore",
  }
);
