import { SECRET_KEY } from "@/configs/env.config";
import { HttpException } from "@/global/http-exception";
import { IAuthTokenPayload } from "@/interfaces/auth.interface";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface IAuthSession extends Request {
  session: IAuthTokenPayload;
}

export class AuthMiddleware {
  public Authenticated = async (
    req: IAuthSession,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { authorization } = req.headers;

      if (!authorization && !authorization?.startsWith("Bearer"))
        throw new HttpException(401, "Unauthorized");

      const token = authorization.trim().split(" ")[1];

      try {
        const user = jwt.verify(token, SECRET_KEY) as IAuthTokenPayload;
        req.session = user;
        next();
      } catch (error) {
        throw new HttpException(401, "Unauthorized");
      }
    } catch (error) {
      next(error);
    }
  };
}
