"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const tslib_1 = require("tslib");
const env_config_1 = require("@/configs/env.config");
const http_exception_1 = require("@/global/http-exception");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
class AuthMiddleware {
    constructor() {
        this.Authenticated = async (req, res, next) => {
            try {
                const { authorization } = req.headers;
                if (!authorization && !(authorization === null || authorization === void 0 ? void 0 : authorization.startsWith("Bearer")))
                    throw new http_exception_1.HttpException(401, "Unauthorized");
                const token = authorization.trim().split(" ")[1];
                try {
                    const user = jsonwebtoken_1.default.verify(token, env_config_1.SECRET_KEY);
                    req.session = user;
                    next();
                }
                catch (error) {
                    throw new http_exception_1.HttpException(401, "Unauthorized");
                }
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map