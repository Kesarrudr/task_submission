"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
const asyncHandler = (requestHadler) => {
    return (req, res, next) => {
        Promise.resolve(requestHadler(req, res, next)).catch((error) => {
            next(error);
        });
    };
};
exports.asyncHandler = asyncHandler;
