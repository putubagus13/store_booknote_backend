import AuthController from '@/controllers/auth.controller';
import { ForgotPassword, GetUserProfile, LoginDto, RegisterDto, ResetPasswordDto } from '@/dto/auth.dto';
import { v1 } from '@/global/api-version';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export default class AuthRoute {
  public path = v1 + '/auth/user';
  public router = Router();
  public authController = new AuthController();
  public authMiddleware = new AuthMiddleware();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //GET

    this.router.get(`${this.path}/profile`, this.authMiddleware.Authenticated, this.authController.getUserProfile);

    //POST

    this.router.post(`${this.path}/login`, ValidationMiddleware('body', LoginDto), this.authController.login);

    this.router.post(`${this.path}/register`, ValidationMiddleware('body', RegisterDto), this.authController.register);

    this.router.post(`${this.path}/forgot-password`, ValidationMiddleware('body', ForgotPassword), this.authController.forgotPassword);

    //PUT
    this.router.put(`${this.path}/reset-password`, ValidationMiddleware('body', ResetPasswordDto), this.authController.resetPassword);
  }
}
