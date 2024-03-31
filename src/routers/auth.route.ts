import AuthController from "@/controllers/auth.controller";
import { GetUserProfile, LoginDto, RegisterDto } from "@/dto/auth.dto";
import { AuthMiddleware } from "@/middlewares/auth.middleware";
import { ValidationMiddleware } from "@/middlewares/validation.middleware";
import { Router } from "express";

export default class AuthRoute {
  public path = "/auth/user";
  public router = Router();
  public authController = new AuthController();
  public authMiddleware = new AuthMiddleware();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //GET
    this.router.get(
      `${this.path}/login`,
      ValidationMiddleware("body", LoginDto),
      this.authController.login
    );

    this.router.get(
      `${this.path}/profile`,
      this.authMiddleware.Authenticated,
      this.authController.getUserProfile
    );

    //POST
    this.router.post(
      `${this.path}/register`,
      ValidationMiddleware("body", RegisterDto),
      this.authController.register
    );
  }
}
