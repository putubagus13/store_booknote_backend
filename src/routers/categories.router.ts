import CategorieController from '@/controllers/categories.controlller';
import { v1 } from '@/global/api-version';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { GetCategoryDto } from '@/services/categories.service';
import { Router } from 'express';

export default class CategoriesRouter {
  private categoriesController = new CategorieController();
  private authMiddleware = new AuthMiddleware();
  router = Router();
  path = v1 + '/categories-options';

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.authMiddleware.Authenticated, ValidationMiddleware('query', GetCategoryDto), this.categoriesController.getAllCategory);
  }
}
