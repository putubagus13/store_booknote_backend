// import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import winston from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';
import { LOG_DIR } from '@/configs/env.config';

const logDir: string = join(process.cwd(), LOG_DIR);

const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

const logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console(),

    //debug log setting
    new WinstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: `${logDir}/debug`,
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      json: false,
      zippedArchive: true,
    }),

    // error log setting
    new WinstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: `${logDir}/error`,
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),

    new winston.transports.File({ level: 'info', filename: 'app.log', dirname: `${logDir}` }),
  ],
});

export { logger, stream };
