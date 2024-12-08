"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = exports.errorHandler = void 0;
const helperFuntions_1 = require("./helperFuntions");
class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.isOperational = true; //false when database type opetations false.
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const errorHandler = (error, _req, res, _next) => {
    console.log(error); //Use Better Logging
    const statusCode = error.statusCode || 500;
    const message = error.isOperational && error.message
        ? error.message
        : "Internet Server Error";
    (0, helperFuntions_1.sendResponse)(res, statusCode, helperFuntions_1.StatusEnum.error, message);
};
exports.errorHandler = errorHandler;
