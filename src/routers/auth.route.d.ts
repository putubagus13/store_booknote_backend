import AuthController from "@/controllers/auth.controller";
import { AuthMiddleware } from "@/middlewares/auth.middleware";
export default class AuthRoute {
    path: string;
    router: import("express-serve-static-core").Router;
    authController: AuthController;
    authMiddleware: AuthMiddleware;
    constructor();
    private initializeRoutes;
}
