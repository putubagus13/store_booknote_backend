import { CreateProductDto, GetProductDto, GetProductHistoryDto } from '@/dto/product.dto';
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

  public getAllProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { storeId } = req.params;
      const query = req.query as unknown as GetProductDto;
      const data = await this.productService.getAllProduct(storeId, query);
      return this.response.Response200(res, { data: data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  public deActiveProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.params;
      const data = await this.productService.deActiveProduct(productId);
      return this.response.Response200(res);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  public getDetailProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.params;
      const data = await this.productService.getDetailProduct(productId);
      return this.response.Response200(res, { data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  public getProductHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.params;
      const query = req.query as unknown as GetProductHistoryDto;
      const data = await this.productService.getProductHistory(productId, query);
      return this.response.Response200(res, { data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
}
