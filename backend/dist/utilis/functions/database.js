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
exports.monthlyStatistics = exports.getProductTranscations = exports.dataBaseInitialize = void 0;
const prisma_client_1 = require("./prisma.client");
const inspector_1 = require("inspector");
const dataBaseInitialize = (records) => __awaiter(void 0, void 0, void 0, function* () {
    if (!records || records.length === 0) {
        return false;
    }
    try {
        //TODO: handle the dupliate entries
        yield prisma_client_1.prisma.dataTable.createMany({
            data: records.map((record) => ({
                data: record,
            })),
            skipDuplicates: true,
        });
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.dataBaseInitialize = dataBaseInitialize;
const getProductTranscations = (search, page, perPage, saleMonth) => __awaiter(void 0, void 0, void 0, function* () {
    const month = `-${String(saleMonth).padStart(2, "0")}-`;
    try {
        const products = yield prisma_client_1.prisma.dataTable.findMany({
            where: {
                AND: [
                    {
                        data: {
                            path: ["dateOfSale"],
                            string_contains: month,
                        },
                    },
                ],
                OR: search
                    ? [
                        {
                            data: {
                                path: ["title"],
                                string_contains: search,
                            },
                        },
                        {
                            data: {
                                path: ["description"],
                                string_contains: search,
                            },
                        },
                        {
                            data: {
                                path: ["price"],
                                equals: parseFloat(search),
                            },
                        },
                    ]
                    : undefined,
            },
            skip: (page - 1) * perPage,
            take: perPage,
        });
        return products;
    }
    catch (error) {
        return null;
    }
});
exports.getProductTranscations = getProductTranscations;
const monthlyStatistics = (month) => __awaiter(void 0, void 0, void 0, function* () {
    inspector_1.console.log("inside function");
    return;
});
exports.monthlyStatistics = monthlyStatistics;
