import StoreTypeController from '@/controllers/store-type.controller';
import { v1 } from '@/global/api-version';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { AddStoreTypeDto } from '@/services/store-type.service';
import { Router } from 'express';

export default class StoreTypeRoute {
  public router = Router();
  path = v1 + '/store-type';
  public storeTypeController = new StoreTypeController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    //POST
    this.router.post(this.path, ValidationMiddleware('body', AddStoreTypeDto), this.storeTypeController.addStoreType);

    //GET
    this.router.get(this.path, this.storeTypeController.getAllStoreType);
  }
}
