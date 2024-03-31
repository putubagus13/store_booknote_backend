import { Model, DataTypes } from "sequelize";
import { sequelize } from "@/configs/database.config";

export default class DailyCustomerShop extends Model {
  declare id: string;
  declare productId: string;
  declare codeTransaction: number;
  declare quantity: number;
  declare totalPrice: number;
  declare dailyNoteId: string;
  declare createdBy?: string;
  declare createdDt?: Date;
  declare updatedBy?: string;
  declare updatedDt?: Date;
  declare deletedDt?: Date;
}

DailyCustomerShop.init(
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
    codeTransaction: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "code_transaction",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "quantity",
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "total_price",
    },
    dailyNoteId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      field: "daily_note_id",
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
    tableName: "daily_customer_shop",
    modelName: "DailyCustomerShop",
  }
);
