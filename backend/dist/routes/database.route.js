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
exports.getMonthlystatistics = exports.IntializeDataBase = exports.getTransactions = void 0;
const utilis_1 = require("../utilis");
const IntializeDataBase = (0, utilis_1.asyncHandler)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //can pass in the url of the dataSource also to initialize the database
    const seedData = yield (0, utilis_1.getSeedData)(); //more type safe code
    if (seedData === null) {
        throw new utilis_1.AppError("Can't get the Seed Data", 503);
    }
    const initializeSuccess = yield (0, utilis_1.dataBaseInitialize)(seedData);
    if (!initializeSuccess) {
        throw new utilis_1.AppError("Can't initialize the DataBase", 503, true);
    }
    (0, utilis_1.sendResponse)(res, 200, utilis_1.StatusEnum.success, "DataBase Initialized Successfully");
}));
exports.IntializeDataBase = IntializeDataBase;
const getTransactions = (0, utilis_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validMonth = req.validMonth;
    const search = req.query.search || "";
    const page = parseInt(req.query.page || "1");
    const perPage = parseInt(req.query.perpage || "10");
    const productTranscation = yield (0, utilis_1.getProductTranscations)(search, page, perPage, validMonth);
    if (productTranscation === null) {
        throw new utilis_1.AppError("Can't get the product transactions", 400, true);
    }
    (0, utilis_1.sendResponse)(res, 200, utilis_1.StatusEnum.success, "All the trascations", {
        productTranscation,
    });
}));
exports.getTransactions = getTransactions;
const getMonthlystatistics = (0, utilis_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside the request");
    const validMonth = req.validMonth;
    console.log("calling function");
    const getMontlyData = yield (0, utilis_1.monthlyStatistics)(validMonth);
    console.log("function called");
    if (getMontlyData === null) {
        throw new utilis_1.AppError("Can't get the monthly Data", 400, true);
    }
    (0, utilis_1.sendResponse)(res, 200, utilis_1.StatusEnum.success, "form the statistics route", getMontlyData);
}));
exports.getMonthlystatistics = getMonthlystatistics;
