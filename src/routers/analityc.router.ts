import AnalitycController from '@/controllers/analityc.controller';
import { AnalitycDto } from '@/dto/analityc.dto';
import { v1 } from '@/global/api-version';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export default class AnalitycRouter {
  private readonly analitycController = new AnalitycController();
  private authMiddleware = new AuthMiddleware();
  public router = Router();
  path = v1 + '/analityc';

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      this.path + '/card/:storeId',
      this.authMiddleware.Authenticated,
      ValidationMiddleware('query', AnalitycDto),
      this.analitycController.getCardAnalityc,
    );

    this.router.get(
      this.path + '/chart/:storeId',
      this.authMiddleware.Authenticated,
      ValidationMiddleware('query', AnalitycDto),
      this.analitycController.getChartAnalityc,
    );
  }
}
