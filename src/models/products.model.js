"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = require("@/configs/database.config");
class Products extends sequelize_1.Model {
}
exports.default = Products;
Products.init({
    id: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
        field: "id",
    },
    productName: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false,
        field: "product_name",
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "quantity",
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: "price",
    },
    description: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false,
        field: "description",
    },
    categoryId: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false,
        field: "category_id",
    },
    unitId: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false,
        field: "unit_id",
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
    modelName: "Products",
    tableName: "products",
});
//# sourceMappingURL=products.model.js.map