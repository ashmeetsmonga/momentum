import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validateRequest = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: "Validation Error",
          errors: error.errors.map((errObj) => errObj.message),
        });
      } else {
        next(error); // Pass other errors to the global error handler
      }
    }
  };
};
