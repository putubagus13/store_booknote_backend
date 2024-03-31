import { HttpException } from "@/global/http-exception";
import { NextFunction, Request, Response } from "express";
export declare const notFoundHandler: (req: Request, res: Response, next: NextFunction) => void;
export declare const errorHandler: (err: HttpException, req: Request, res: Response, _: NextFunction) => void;
