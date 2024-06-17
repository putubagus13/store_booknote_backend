import UserController from '@/controllers/user.controller';
import UpdateProfileDto from '@/dto/user.dto';
import { v1 } from '@/global/api-version';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export default class UserRouter {
  public userController = new UserController();
  public authMiddleware = new AuthMiddleware();
  public router = Router();
  path = v1 + '/user';

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.put(
      this.path + '/profile',
      this.authMiddleware.Authenticated,
      ValidationMiddleware('body', UpdateProfileDto),
      this.userController.updateProfile,
    );
  }
}
