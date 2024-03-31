"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const database_config_1 = require("@/configs/database.config");
const uuid_1 = require("uuid");
const http_exception_1 = require("@/global/http-exception");
const user_model_1 = tslib_1.__importDefault(require("@/models/user.model"));
const user_password_model_1 = require("@/models/user-password.model");
const user_store_model_1 = tslib_1.__importDefault(require("@/models/user-store.model"));
const store_model_1 = tslib_1.__importDefault(require("@/models/store.model"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const env_config_1 = require("@/configs/env.config");
let AuthService = class AuthService {
    constructor() {
        this.authBase = async (where) => {
            try {
                const foundUser = await user_model_1.default.findOne({
                    where: Object.assign({}, where),
                });
                if (!foundUser) {
                    throw new http_exception_1.HttpException(400, "User not found");
                }
                return foundUser;
            }
            catch (error) {
                throw new http_exception_1.HttpException(400, error.message);
            }
        };
        this.register = async (dto) => {
            const foundUser = await user_model_1.default.findOne({ where: { email: dto.email } });
            if (foundUser) {
                throw new http_exception_1.HttpException(400, "User already exists");
            }
            const userId = (0, uuid_1.v4)();
            const hashPassword = await bcrypt_1.default.hash(dto.password, 10);
            const user = new user_model_1.default();
            user.userId = userId;
            user.email = dto.email;
            user.fullname = dto.fullname;
            const userPassword = new user_password_model_1.UserPassword();
            userPassword.id = (0, uuid_1.v4)();
            userPassword.userId = userId;
            userPassword.hashPassword = hashPassword;
            const store = new store_model_1.default();
            store.id = (0, uuid_1.v4)();
            store.name = dto.storeName;
            store.createdBy = userId;
            store.createdDt = new Date();
            const userStore = new user_store_model_1.default();
            userStore.id = (0, uuid_1.v4)();
            userStore.userId = userId;
            userStore.storeId = store.id;
            userStore.createdDt = new Date();
            try {
                await database_config_1.sequelize.transaction(async (t) => {
                    await user.save({ transaction: t });
                    await userPassword.save({ transaction: t });
                    await store.save({ transaction: t });
                    await userStore.save({ transaction: t });
                });
            }
            catch (error) {
                console.error("Error in transaction:", error);
                throw new http_exception_1.HttpException(400, error.message);
            }
            return "User registered";
        };
        this.login = async (res, dto) => {
            const user = await user_model_1.default.findOne({ where: { email: dto.email } });
            if (!user) {
                throw new http_exception_1.HttpException(400, "Email is incorrect");
            }
            const userPassword = await user_password_model_1.UserPassword.findOne({
                where: { userId: user.userId },
            });
            const isPasswordMatch = await bcrypt_1.default.compare(dto.password, userPassword.hashPassword);
            if (!isPasswordMatch) {
                throw new http_exception_1.HttpException(400, "Password is incorrect");
            }
            const userStore = await user_store_model_1.default.findOne({
                where: { userId: user.userId },
            });
            const payload = {
                userId: user.userId,
                fullname: user.fullname,
                email: user.email,
                imageUrl: user.imageUrl,
                storeId: userStore.storeId,
            };
            const token = jsonwebtoken_1.default.sign(payload, env_config_1.SECRET_KEY, {
                expiresIn: "1d",
            });
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                expires: new Date(Number(new Date()) + 86400000),
            });
            return {
                token,
            };
        };
        this.getUserProfile = async (session) => {
            const user = await this.authBase({ userId: session.userId });
            return user;
        };
    }
};
AuthService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map