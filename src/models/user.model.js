"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = require("@/configs/database.config");
class User extends sequelize_1.Model {
}
exports.default = User;
User.init({
    userId: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
        field: "user_id",
    },
    fullname: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true,
        field: "fullname",
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true,
        field: "image_url",
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        field: "phone_number",
    },
    email: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true,
        field: "email",
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
    tableName: "user",
    modelName: "User",
});
//# sourceMappingURL=user.model.js.map