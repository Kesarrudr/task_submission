"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.monthValidatorMiddleWare = void 0;
const utilis_1 = require("../utilis");
const monthValidatorMiddleWare = (0, utilis_1.asyncHandler)((req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //should be the month number
    const month = req.query.month;
    if (!month || !Object.values(utilis_1.Months).includes(parseInt(month))) {
        throw new utilis_1.AppError("Invalid month", 400);
    }
    req.validMonth = month; //set the month number in the validMonth feild
    next();
}));
exports.monthValidatorMiddleWare = monthValidatorMiddleWare;
