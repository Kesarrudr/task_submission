import { NextFunction, Request, Response } from "express";
import { AppError, asyncHandler, Months } from "../utilis";

export interface CustomRequest extends Request {
  validMonth?: string;
}

const monthValidatorMiddleWare = asyncHandler(
  async (req: CustomRequest, _res: Response, next: NextFunction) => {
    //should be the month number
    const month = req.query.month as string;
    if (!month || !Object.values(Months).includes(parseInt(month))) {
      throw new AppError("Invalid month", 400);
    }

    req.validMonth = month; //set the month number in the validMonth feild
    next();
  },
);

export { monthValidatorMiddleWare };
