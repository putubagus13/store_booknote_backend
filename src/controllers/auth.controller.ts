import { LoginDto, RegisterDto } from "@/dto/auth.dto";
import { HttpException } from "@/global/http-exception";
import { ResponseSuccess } from "@/global/response";
import { IAuthTokenPayload } from "@/interfaces/auth.interface";
import AuthService from "@/services/auth.service";
import { Response, Request, NextFunction } from "express";
import Container from "typedi";

export default class AuthController {
  public authService = Container.get(AuthService);
  public response = new ResponseSuccess();

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as unknown as LoginDto;
      const payload = await this.authService.login(res, body);

      if (!payload) throw new HttpException(400, "Login failed");

      return this.response.Response200(res, payload);
    } catch (error) {
      next(error);
    }
  };

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as unknown as RegisterDto;
      const payload = await this.authService.register(body);

      if (!payload) throw new HttpException(400, "User not registered");

      return this.response.Response201(res);
    } catch (error) {
      next(error);
    }
  };

  public getUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const session: IAuthTokenPayload = (req as any).session;

      const payload = await this.authService.getUserProfile(session);

      if (!payload) throw new HttpException(400, "Get user profile failed");

      return this.response.Response200(res, { payload });
    } catch (error) {
      next(error);
    }
  };
}
