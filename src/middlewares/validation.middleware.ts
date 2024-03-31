import { plainToInstance } from "class-transformer";
import { ValidationError, validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";

/**
 * @name ValidationMiddleware
 * @description Allows use of decorator and non-decorator based validation
 * @param type things to be validate, params or body
 * @param schema dto
 * @param skipMissingProperties When skipping missing properties
 * @param whitelist Even if your object is an instance of a validation class it can contain additional properties that are not defined
 * @param forbidNonWhitelisted If you would rather to have an error thrown when any non-whitelisted properties are present
 */
export const ValidationMiddleware = (
  type: "query" | "body",
  schema: any,
  skipMissingProperties = false,
  whitelist = false,
  forbidNonWhitelisted = false
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(schema, req[type]);
    validateOrReject(dto, {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    })
      .then(() => {
        req[type] = dto;
        next();
      })
      .catch((errors: ValidationError[]) => {
        const message = errors
          .map((error: ValidationError) => Object.values(error.constraints))
          .join(", ");

        return res.status(400).json({
          status: false,
          statusCode: 400,
          message,
        });
      });
  };
};
