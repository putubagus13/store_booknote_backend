"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const env_config_1 = require("@/configs/env.config");
exports.sequelize = new sequelize_1.Sequelize({
    username: env_config_1.DB_USER,
    password: env_config_1.DB_PASSWORD,
    host: env_config_1.DB_HOST,
    port: env_config_1.DB_PORT,
    database: env_config_1.DB_DATABASE,
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
//# sourceMappingURL=database.config.js.map