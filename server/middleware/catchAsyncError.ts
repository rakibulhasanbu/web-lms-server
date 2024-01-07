import { NextFunction, Request, RequestHandler, Response } from "express";

export const CatchAsyncError =
  (theFunc: RequestHandler) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch((error) => next(error));
  };
