import { Sequelize } from "sequelize";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "@/configs/env.config";

export const sequelize = new Sequelize({
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_DATABASE,
  dialect: "mysql",
  define: {
    underscored: true,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
    timestamps: false,
  },
  pool: {
    max: 50,
    min: 0,
    acquire: 30000,
    idle: 300000,
  },
  logging: true,
  logQueryParameters: true,
});
