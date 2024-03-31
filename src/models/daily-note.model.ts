import { Model, DataTypes } from "sequelize";
import { sequelize } from "@/configs/database.config";

export default class DailyNote extends Model {
  declare id: string;
  declare totalDailyCustomerShop: string;
  declare totalShoping: number;
  declare modal: number;
  declare saldo: number;
  declare storeId: string;
  declare createdBy?: string;
  declare createdDt?: Date;
  declare updatedBy?: string;
  declare updatedDt?: Date;
  declare deletedDt?: Date;
}

DailyNote.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    totalDailyCustomerShop: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "total_daily_customer_shop",
    },
    totalShoping: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "total_shoping",
    },
    modal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "modal",
    },
    saldo: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "saldo",
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
    tableName: "daily_note",
    modelName: "DailyNote",
  }
);
