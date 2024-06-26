import { sequelize } from './src/configs/database.config';
import { APP_PORT, CREDENTIALS, LOG_FORMAT, ORIGIN, STATIC_FILE_PATH_PRODUCT, STATIC_FILE_PATH_USER } from './src/configs/env.config';
import { logger, stream } from './src/utils/loggers';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { errorHandler, notFoundHandler } from './src/middlewares/error-handler.middleware';
import { Routes } from './src/utils/annotations';

export class App {
  public app: express.Application;
  public port: string | number;

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`==============================`);
      logger.info(`🚀 App listening on port ${this.port}`);
      logger.info(`==============================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    try {
      await sequelize.sync({ alter: false });
      logger.info('Database connected!');
    } catch (error) {
      logger.info('Database failed to connect!');
      logger.error(error);
    }
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));

    this.app.use(
      helmet({
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
      }),
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  public initializeRoutes(routes: Routes[]) {
    this.app.use('/hello', (req, res) => {
      res.send('Backend Engage');
    });

    this.app.use('/images/users', express.static(STATIC_FILE_PATH_USER));
    this.app.use('/images/product', express.static(STATIC_FILE_PATH_PRODUCT));

    routes.forEach((route) => {
      this.app.use('/', route.router);
    });

    this.app.use('*', notFoundHandler); // 404 handler
    this.app.use(errorHandler); // error handler
  }

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = APP_PORT;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }
}
