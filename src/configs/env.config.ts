import "dotenv/config";
import { bool, cleanEnv, num, str } from "envalid";

export const validateEnv = () => {
  return cleanEnv(process.env, {
    // APPLICATION
    APP_PORT: num(),

    // DATABASE
    DB_USER: str(),
    DB_PASSWORD: str(),
    DB_HOST: str(),
    DB_PORT: num(),
    DB_DATABASE: str(),

    // LOG
    LOG_FORMAT: str(),
    LOG_DIR: str(),

    //CORS
    ORIGIN: str(),
    CREDENTIALS: bool(),

    //STATIC FILE PATH
    STATIC_FILE_PATH: str(),

    SECRET_KEY: str(),
  });
};

export const {
  APP_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  LOG_DIR,
  LOG_FORMAT,
  ORIGIN,
  CREDENTIALS,
  STATIC_FILE_PATH,
  SECRET_KEY,
} = validateEnv();
