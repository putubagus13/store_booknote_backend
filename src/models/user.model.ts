import { Sequelize, Model, DataTypes } from "sequelize";
import { sequelize } from "@/configs/database.config";

export default class User extends Model {
  declare userId: string;
  declare fullname?: string;
  declare imageUrl?: string;
  declare phoneNumber?: number;
  declare email?: string;
  declare createdBy?: string;
  declare createdDt?: Date;
  declare updatedBy?: string;
  declare updatedDt?: Date;
  declare deletedDt?: Date;
}

User.init(
  {
    userId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      field: "user_id",
    },
    fullname: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: "fullname",
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: "image_url",
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "phone_number",
    },
    email: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: "email",
    },
    createdBy: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      field: "created_by",
    },
    createdDt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn("current_timestamp"),
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
    tableName: "user",
    modelName: "User",
  }
);
