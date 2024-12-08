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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusEnum = exports.sendResponse = exports.getSeedData = void 0;
const axios_1 = __importDefault(require("axios"));
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["success"] = "success";
    StatusEnum["error"] = "error";
})(StatusEnum || (exports.StatusEnum = StatusEnum = {}));
const sendResponse = (res, statusCode, status, message, data = null) => {
    return res.status(statusCode).json({
        status,
        message,
        data,
    });
};
exports.sendResponse = sendResponse;
const getSeedData = (databaseUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(databaseUrl ||
        "https://s3.amazonaws.com/roxiler.com/product_transaction.json");
    const data = response.data;
    if (!data) {
        return null;
    }
    return data;
});
exports.getSeedData = getSeedData;
