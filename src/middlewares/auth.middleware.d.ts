/// <reference types="cookie-parser" />
import { IAuthTokenPayload } from "@/interfaces/auth.interface";
import { NextFunction, Request, Response } from "express";
export interface IAuthSession extends Request {
    session: IAuthTokenPayload;
}
export declare class AuthMiddleware {
    Authenticated: (req: IAuthSession, res: Response, next: NextFunction) => Promise<void>;
}
