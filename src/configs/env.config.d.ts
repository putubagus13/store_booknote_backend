import "dotenv/config";
export declare const validateEnv: () => Readonly<{
    APP_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_DATABASE: string;
    LOG_FORMAT: string;
    LOG_DIR: string;
    ORIGIN: string;
    CREDENTIALS: boolean;
    STATIC_FILE_PATH: string;
    SECRET_KEY: string;
} & import("envalid").CleanedEnvAccessors>;
export declare const APP_PORT: number, DB_USER: string, DB_PASSWORD: string, DB_HOST: string, DB_PORT: number, DB_DATABASE: string, LOG_DIR: string, LOG_FORMAT: string, ORIGIN: string, CREDENTIALS: boolean, STATIC_FILE_PATH: string, SECRET_KEY: string;
