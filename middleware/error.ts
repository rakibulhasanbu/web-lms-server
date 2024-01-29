import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleware = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal server error occurred";

  // wrong mongodb id error
  if (error.name === "CastError") {
    const message = `Recourse not found, invalid ${error.path}`;
    error = new ErrorHandler(message, 400);
  }

  // duplicate key error
  if (error.code === 11000) {
    const message = `Duplicate ${Object.keys(error.keyValue)} entered`;
    error = new ErrorHandler(message, 400);
  }

  // wrong jwt error
  if (error.name === "JsonWebTokenError") {
    const message = `Json web token is invalid, please provide valid token`;
    error = new ErrorHandler(message, 400);
  }

  //jwt expired error
  if (error.name === "TokenExpiredError") {
    const message = `json web token expired, login and try again`;
    error = new ErrorHandler(message, 400);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
