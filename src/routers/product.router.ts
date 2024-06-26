import ProductController from '@/controllers/product.controller';
import { CreateProductDto, GetProductDto, GetProductHistoryDto, UpdateProductDto } from '@/dto/product.dto';
import { v1 } from '@/global/api-version';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export default class ProductRouter {
  private productController = new ProductController();
  private authMiddleware = new AuthMiddleware();
  router = Router();
  path = v1 + '/product';

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //post
    this.router.post(this.path, this.authMiddleware.Authenticated, ValidationMiddleware('body', CreateProductDto), this.productController.createProduct);
    //put
    this.router.put(
      this.path + '/:productId',
      this.authMiddleware.Authenticated,
      ValidationMiddleware('body', UpdateProductDto),
      this.productController.updateProduct,
    );
    //get
    this.router.get(
      this.path + '/:storeId',
      this.authMiddleware.Authenticated,
      ValidationMiddleware('query', GetProductDto),
      this.productController.getAllProduct,
    );
    this.router.get(this.path + '/detail/:productId', this.authMiddleware.Authenticated, this.productController.getDetailProduct);
    this.router.get(
      this.path + '/history/:productId',
      this.authMiddleware.Authenticated,
      ValidationMiddleware('query', GetProductHistoryDto),
      this.productController.getProductHistory,
    );
    //delete
    this.router.delete(this.path + '/:productId', this.authMiddleware.Authenticated, this.productController.deActiveProduct);
  }
}
