import { ResponseSuccess } from "@/global/response";
import AuthService from "@/services/auth.service";
import { Response, Request, NextFunction } from "express";
export default class AuthController {
    authService: AuthService;
    response: ResponseSuccess;
    login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getUserProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
