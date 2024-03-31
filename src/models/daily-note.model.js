"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = require("@/configs/database.config");
class DailyNote extends sequelize_1.Model {
}
exports.default = DailyNote;
DailyNote.init({
    id: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
        field: "id",
    },
    totalDailyCustomerShop: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "total_daily_customer_shop",
    },
    totalShoping: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "total_shoping",
    },
    modal: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: "modal",
    },
    saldo: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: "saldo",
    },
    storeId: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false,
        field: "store_id",
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
    tableName: "daily_note",
    modelName: "DailyNote",
});
//# sourceMappingURL=daily-note.model.js.map