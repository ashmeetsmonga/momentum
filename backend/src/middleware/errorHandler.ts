import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      message: "Validation Error",
      errors: err.errors, // Detailed Zod validation errors
    });
  } else {
    console.error("Ashmeet");
    res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
      stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    });
  }
};

export default errorHandler;
