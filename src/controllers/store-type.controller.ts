import StoreTypeService, { AddStoreTypeDto } from '@/services/store-type.service';
import Container from 'typedi';
import { Request, Response, NextFunction } from 'express';
import { ResponseSuccess } from '@/global/response';
import { HttpException } from '@/global/http-exception';

export default class StoreTypeController {
  public storeTypeService = Container.get(StoreTypeService);
  public response = new ResponseSuccess();

  public addStoreType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: AddStoreTypeDto = req.body;
      const data = await this.storeTypeService.addType(body);
      if (!data) throw new HttpException(400, 'Add store type failed');
      return this.response.Response200(res, { data });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
