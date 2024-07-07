import StoreService, { AddStoreTypeDto } from '@/services/store.service';
import Container from 'typedi';
import { Request, Response, NextFunction } from 'express';
import { ResponseSuccess } from '@/global/response';
import { HttpException } from '@/global/http-exception';

export default class StoreController {
  public storeService = Container.get(StoreService);
  public response = new ResponseSuccess();

  public addStoreType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: AddStoreTypeDto = req.body;
      const data = await this.storeService.addType(body);
      if (!data) throw new HttpException(400, 'Add store type failed');
      return this.response.Response200(res, { data });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getAllStoreType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.storeService.getAllStoreType();
      return this.response.Response200(res, { data });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updateStore = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { storeId } = req.params;
      const body = req.body;
      await this.storeService.updateStore(storeId, body);
      return this.response.Response200(res);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
