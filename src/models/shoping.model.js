"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = require("@/configs/database.config");
class Shoping extends sequelize_1.Model {
}
exports.default = Shoping;
Shoping.init({
    id: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
        field: "id",
    },
    productId: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false,
        field: "product_id",
    },
    codeTransaction: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "code_transaction",
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "quantity",
    },
    totalPrice: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: "total_price",
    },
    dailyNoteId: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false,
        field: "daily_note_id",
    },
    createdBy: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: true,
        field: "created_by",
    },
    createdDt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: database_config_1.sequelize.fn("current_timestamp"),
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
    tableName: "shoping",
    modelName: "Shoping",
});
//# sourceMappingURL=shoping.model.js.map