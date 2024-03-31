"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = void 0;
const http_exception_1 = require("@/global/http-exception");
const notFoundHandler = (req, res, next) => {
    next(new http_exception_1.HttpException(404, "Resource not found"));
};
exports.notFoundHandler = notFoundHandler;
const errorHandler = (err, req, res, _) => {
    if (err.statusCode && err.statusCode != 500) {
        const payload = {
            message: err.message,
            status: false,
            statusCode: err.statusCode,
        };
        res.status(err.statusCode).json(payload);
    }
    else {
        console.log(err);
        res.status(err.statusCode).json({
            message: "INTERNAL_SERVER_ERROR",
            status: false,
            statusCode: err.statusCode,
        });
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.middleware.js.map