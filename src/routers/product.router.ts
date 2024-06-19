import ProductController from '@/controllers/product.controller';
import { CreateProductDto, UpdateProductDto } from '@/dto/product.dto';
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
    this.router.post(this.path, this.authMiddleware.Authenticated, ValidationMiddleware('body', CreateProductDto), this.productController.createProduct);
    this.router.put(
      this.path + '/:productId',
      this.authMiddleware.Authenticated,
      ValidationMiddleware('body', UpdateProductDto),
      this.productController.updateProduct,
    );
  }
}
