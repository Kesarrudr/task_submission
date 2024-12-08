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
exports.HealthCheck = void 0;
const utilis_1 = require("../utilis");
const HealthCheck = (0, utilis_1.asyncHandler)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isHealthy = true; //check the health
    if (!isHealthy) {
        throw new utilis_1.AppError("Server is not fine ❌", 503);
    }
    (0, utilis_1.sendResponse)(res, 200, utilis_1.StatusEnum.success, "Everything is fine 👍");
}));
exports.HealthCheck = HealthCheck;
