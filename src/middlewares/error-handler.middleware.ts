import { HttpException } from "@/global/http-exception";
import { NextFunction, Request, Response } from "express";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new HttpException(404, "Resource not found"));
};

export const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (err.statusCode && err.statusCode != 500) {
    const payload = {
      message: err.message,
      status: false,
      statusCode: err.statusCode,
    };
    res.status(err.statusCode).json(payload);
  } else {
    console.log(err);
    res.status(err.statusCode).json({
      message: "INTERNAL_SERVER_ERROR",
      status: false,
      statusCode: err.statusCode,
    });
  }
};
