import { NextFunction, Request, RequestHandler, Response } from "express";

const asyncHandler = (requestHadler: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHadler(req, res, next)).catch((error) => {
      next(error);
    });
  };
};

export { asyncHandler };
