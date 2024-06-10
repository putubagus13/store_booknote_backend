import StoreTypeController from '@/controllers/store-type.controller';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { AddStoreTypeDto } from '@/services/store-type.service';
import { Router } from 'express';

export default class StoreTypeRoute {
  public router = Router();
  public storeTypeController = new StoreTypeController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    //POST
    this.router.post(`/store-type`, ValidationMiddleware('body', AddStoreTypeDto), this.storeTypeController.addStoreType);
  }
}
