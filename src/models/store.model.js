"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = require("@/configs/database.config");
class Store extends sequelize_1.Model {
}
exports.default = Store;
Store.init({
    id: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
        field: "id",
    },
    name: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false,
        field: "name",
    },
    storeImageUrl: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true,
        field: "store_image_url",
    },
    description: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true,
        field: "description",
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
    tableName: "store",
    modelName: "Store",
});
//# sourceMappingURL=store.model.js.map