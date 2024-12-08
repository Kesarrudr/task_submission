import { Router } from "express";
import {
  getAllData,
  getBarChartData,
  getMonthlystatistics,
  getPieChartData,
  getTransactions,
  IntializeDataBase,
} from "../routes/database.route";
import { monthValidatorMiddleWare } from "../middleware/add_month";

const router = Router();

router.route("/initialize").get(IntializeDataBase);

// MiddleWare works all the below routes
router.use(monthValidatorMiddleWare);
router.route("/transactions").get(getTransactions);
router.route("/statistics").get(getMonthlystatistics);
router.route("/barChart").get(getBarChartData);
router.route("/piechart").get(getPieChartData);
router.route("/alldata").get(getAllData);

export { router as DataBaseCotroller };
