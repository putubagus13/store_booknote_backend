"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const auth_controller_1 = tslib_1.__importDefault(require("@/controllers/auth.controller"));
const auth_dto_1 = require("@/dto/auth.dto");
const auth_middleware_1 = require("@/middlewares/auth.middleware");
const validation_middleware_1 = require("@/middlewares/validation.middleware");
const express_1 = require("express");
class AuthRoute {
    constructor() {
        this.path = "/auth/user";
        this.router = (0, express_1.Router)();
        this.authController = new auth_controller_1.default();
        this.authMiddleware = new auth_middleware_1.AuthMiddleware();
        this.initializeRoutes();
    }
    initializeRoutes() {
        //GET
        this.router.get(`${this.path}/login`, (0, validation_middleware_1.ValidationMiddleware)("body", auth_dto_1.LoginDto), this.authController.login);
        this.router.get(`${this.path}/profile`, this.authMiddleware.Authenticated, this.authController.getUserProfile);
        //POST
        this.router.post(`${this.path}/register`, (0, validation_middleware_1.ValidationMiddleware)("body", auth_dto_1.RegisterDto), this.authController.register);
    }
}
exports.default = AuthRoute;
//# sourceMappingURL=auth.route.js.map