"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPassword = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = require("@/configs/database.config");
class UserPassword extends sequelize_1.Model {
}
exports.UserPassword = UserPassword;
UserPassword.init({
    id: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
        field: "id",
    },
    userId: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false,
        field: "user_id",
    },
    hashPassword: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
        field: "hash_password",
    },
    createdBy: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: true,
        field: "created_by",
    },
    createdDt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize_1.Sequelize.fn("current_timestamp"),
        field: "created_dt",
    },
    updatedBy: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: true,
        field: "updated_by",
    },
    updatedDt: {
        type: sequelize_1.DataTypes.DATE(6),
        allowNull: true,
        field: "updated_dt",
    },
    deletedDt: {
        type: sequelize_1.DataTypes.DATE(6),
        allowNull: true,
        field: "deleted_dt",
    },
}, {
    sequelize: database_config_1.sequelize,
    tableName: "user_password",
    modelName: "UserPassword",
});
//# sourceMappingURL=user-password.model.js.map