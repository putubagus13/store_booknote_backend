import { CreateProductDto } from '@/dto/product.dto';
import { ResponseSuccess } from '@/global/response';
import { IAuthTokenPayload } from '@/interfaces/auth.interface';
import ProductService from '@/services/product.service';
import { logger } from '@/utils/loggers';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export default class ProductController {
  readonly productService = Container.get(ProductService);
  response = new ResponseSuccess();

  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session: IAuthTokenPayload = (req as any).session;
      const body = req.body as CreateProductDto;

      await this.productService.createProduct(session, body);
      return this.response.Response201(res);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session: IAuthTokenPayload = (req as any).session;
      const body = req.body as CreateProductDto;
      const { productId } = req.params;

      await this.productService.updateProduct(session, body, productId);
      return this.response.Response200(res);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
}
