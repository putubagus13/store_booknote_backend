"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET_KEY = exports.STATIC_FILE_PATH = exports.CREDENTIALS = exports.ORIGIN = exports.LOG_FORMAT = exports.LOG_DIR = exports.DB_DATABASE = exports.DB_PORT = exports.DB_HOST = exports.DB_PASSWORD = exports.DB_USER = exports.APP_PORT = exports.validateEnv = void 0;
require("dotenv/config");
const envalid_1 = require("envalid");
const validateEnv = () => {
    return (0, envalid_1.cleanEnv)(process.env, {
        // APPLICATION
        APP_PORT: (0, envalid_1.num)(),
        // DATABASE
        DB_USER: (0, envalid_1.str)(),
        DB_PASSWORD: (0, envalid_1.str)(),
        DB_HOST: (0, envalid_1.str)(),
        DB_PORT: (0, envalid_1.num)(),
        DB_DATABASE: (0, envalid_1.str)(),
        // LOG
        LOG_FORMAT: (0, envalid_1.str)(),
        LOG_DIR: (0, envalid_1.str)(),
        //CORS
        ORIGIN: (0, envalid_1.str)(),
        CREDENTIALS: (0, envalid_1.bool)(),
        //STATIC FILE PATH
        STATIC_FILE_PATH: (0, envalid_1.str)(),
        SECRET_KEY: (0, envalid_1.str)(),
    });
};
exports.validateEnv = validateEnv;
_a = (0, exports.validateEnv)(), exports.APP_PORT = _a.APP_PORT, exports.DB_USER = _a.DB_USER, exports.DB_PASSWORD = _a.DB_PASSWORD, exports.DB_HOST = _a.DB_HOST, exports.DB_PORT = _a.DB_PORT, exports.DB_DATABASE = _a.DB_DATABASE, exports.LOG_DIR = _a.LOG_DIR, exports.LOG_FORMAT = _a.LOG_FORMAT, exports.ORIGIN = _a.ORIGIN, exports.CREDENTIALS = _a.CREDENTIALS, exports.STATIC_FILE_PATH = _a.STATIC_FILE_PATH, exports.SECRET_KEY = _a.SECRET_KEY;
//# sourceMappingURL=env.config.js.map