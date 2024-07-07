import StoreController from '@/controllers/store.controller';
import { v1 } from '@/global/api-version';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { AddStoreTypeDto, UpdateStoreDto } from '@/services/store.service';
import { Router } from 'express';

export default class StoreRoute {
  public router = Router();
  path = v1 + '/store';
  public storeController = new StoreController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    //POST
    this.router.post(this.path + '/type', ValidationMiddleware('body', AddStoreTypeDto), this.storeController.addStoreType);

    //PUT
    this.router.put(this.path + '/:storeId', ValidationMiddleware('body', UpdateStoreDto), this.storeController.updateStore);

    //GET
    this.router.get(this.path + '/type', this.storeController.getAllStoreType);
  }
}
