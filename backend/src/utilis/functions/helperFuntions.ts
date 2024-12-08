import axios from "axios";
import { Response } from "express";
import { priceRanges } from "../constant";
import { ProductCategorie, ProductData } from "./database";
import { Record } from "@prisma/client/runtime/library";

enum StatusEnum {
  success = "success",
  error = "error",
}

const sendResponse = (
  res: Response,
  statusCode: number,
  status: StatusEnum,
  message: string,
  data: any = null,
) => {
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};

const getSeedData = async (databaseUrl?: string) => {
  const response = await axios.get(
    databaseUrl ||
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json",
  );
  const data: [] = response.data;
  if (!data) {
    return null;
  }
  return data;
};

const getMonthlyStats = (data: ProductData[]) => {
  const montlyData = {
    totalSaleAmount: 0,
    totalSold: 0,
    totalNotSold: 0,
  };

  data.forEach((product) => {
    if (product.sold) {
      montlyData.totalSold++;
      montlyData.totalSaleAmount += product.price;
    } else {
      montlyData.totalNotSold++;
    }
  });

  return montlyData;
};

const barChartData = (products: ProductData[]) => {
  const result = priceRanges.map((range) => ({
    range: range.range,
    count: 0,
  }));

  products.forEach((product) => {
    const price = product.price as number;
    if (price != null) {
      priceRanges.forEach((range, index) => {
        if (price >= range.min && price <= range.max) {
          result[index].count += 1;
        }
      });
    }
  });

  return result;
};

const pieChartData = (products: ProductCategorie[]) => {
  const categoryCounts: Record<string, number> = {};

  products.forEach((product) => {
    const category = product.category;
    if (category) {
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    }
  });

  return categoryCounts;
};

export {
  barChartData,
  getMonthlyStats,
  getSeedData,
  sendResponse,
  pieChartData,
  StatusEnum,
};
