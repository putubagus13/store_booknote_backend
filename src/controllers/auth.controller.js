"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_exception_1 = require("@/global/http-exception");
const response_1 = require("@/global/response");
const auth_service_1 = tslib_1.__importDefault(require("@/services/auth.service"));
const typedi_1 = tslib_1.__importDefault(require("typedi"));
class AuthController {
    constructor() {
        this.authService = typedi_1.default.get(auth_service_1.default);
        this.response = new response_1.ResponseSuccess();
        this.login = async (req, res, next) => {
            try {
                const body = req.body;
                const payload = await this.authService.login(res, body);
                if (!payload)
                    throw new http_exception_1.HttpException(400, "Login failed");
                return this.response.Response200(res, payload);
            }
            catch (error) {
                next(error);
            }
        };
        this.register = async (req, res, next) => {
            try {
                const body = req.body;
                const payload = await this.authService.register(body);
                if (!payload)
                    throw new http_exception_1.HttpException(400, "User not registered");
                return this.response.Response201(res);
            }
            catch (error) {
                next(error);
            }
        };
        this.getUserProfile = async (req, res, next) => {
            try {
                const session = req.session;
                const payload = await this.authService.getUserProfile(session);
                if (!payload)
                    throw new http_exception_1.HttpException(400, "Get user profile failed");
                return this.response.Response200(res, { payload });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map