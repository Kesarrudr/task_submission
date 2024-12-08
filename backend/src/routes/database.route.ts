import { Request, Response } from "express";
import { CustomRequest } from "../middleware/add_month";
import {
  AppError,
  asyncHandler,
  barChartData,
  dataBaseInitialize,
  getmonthlydata,
  getMonthlyStats,
  getProductCategories,
  getProductTranscations,
  getSeedData,
  pieChartData,
  sendResponse,
  StatusEnum,
} from "../utilis";

const IntializeDataBase = asyncHandler(async (_req: Request, res: Response) => {
  //can pass in the url of the dataSource also to initialize the database
  const seedData = await getSeedData(); //more type safe code

  if (seedData === null) {
    throw new AppError("Can't get the Seed Data", 503);
  }
  const initializeSuccess = await dataBaseInitialize(seedData);
  if (!initializeSuccess) {
    throw new AppError("Can't initialize the DataBase", 503, true);
  }
  sendResponse(
    res,
    200,
    StatusEnum.success,
    "DataBase Initialized Successfully",
  );
});

const getTransactions = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const validMonth = req.validMonth as string;
    const search = (req.query.search as string) || ("" as string);

    const page = parseInt((req.query.page as string) || "1");
    const perPage = parseInt((req.query.perpage as string) || "10");

    const productTranscation = await getProductTranscations(
      search,
      page,
      perPage,
      validMonth,
    );

    if (productTranscation === null) {
      throw new AppError("Can't get the product transactions", 400, true);
    }
    sendResponse(res, 200, StatusEnum.success, "All the trascations", {
      productTranscation,
    });
  },
);

const getMonthlystatistics = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const validMonth = req.validMonth as string;

    const monthlyData = await getmonthlydata(validMonth);

    if (monthlyData === null || monthlyData === undefined) {
      throw new AppError("Can't get the monthly Data", 400, true);
    }

    const finalData = getMonthlyStats(monthlyData);

    sendResponse(res, 200, StatusEnum.success, "Montly Statistics", finalData);
  },
);

const getBarChartData = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const validMonth = req.validMonth as string;

    const products = await getmonthlydata(validMonth);

    if (products === null || products === undefined) {
      throw new AppError("Can't get the Products", 503, true);
    }

    const finalCharData = barChartData(products);

    sendResponse(res, 200, StatusEnum.success, "Bar Chart Data", finalCharData);
  },
);

const getPieChartData = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const validMonth = req.validMonth as string;

    const productsData = await getProductCategories(validMonth);

    if (productsData === null || productsData === undefined) {
      throw new AppError("Can't get the Product Data", 503, true);
    }

    const finalData = pieChartData(productsData);

    sendResponse(res, 200, StatusEnum.success, "Pie Chart Data", finalData);
  },
);

const getAllData = asyncHandler(async (req: CustomRequest, res: Response) => {
  const validMonth = req.validMonth as string;

  const monthlyData = await getmonthlydata(validMonth);

  if (monthlyData === null || monthlyData === undefined) {
    throw new AppError("Can't get the Products Data", 503, true);
  }
  const monthlyFinalData = getMonthlyStats(monthlyData);
  const finalBarChartData = barChartData(monthlyData);
  const pieData = await getProductCategories(validMonth);

  if (pieData === null || pieData === undefined) {
    throw new AppError("Can't get the Product category", 503, true);
  }

  const finalPieChartData = pieChartData(pieData);

  sendResponse(res, 200, StatusEnum.success, "All Data", {
    monthlyStatistics: monthlyFinalData,
    barData: finalBarChartData,
    pieData: finalPieChartData,
  });
});

export {
  getAllData,
  getBarChartData,
  getMonthlystatistics,
  getPieChartData,
  getTransactions,
  IntializeDataBase,
};
