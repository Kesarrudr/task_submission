"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseCotroller = void 0;
const express_1 = require("express");
const database_route_1 = require("../routes/database.route");
const add_month_1 = require("../middleware/add_month");
const router = (0, express_1.Router)();
exports.DataBaseCotroller = router;
router.route("/initilize").get(database_route_1.IntializeDataBase);
// MiddleWare works all the below routes
router.use(add_month_1.monthValidatorMiddleWare);
router.route("/transcations").get(database_route_1.getTransactions);
router.route("/statistics").get(database_route_1.getMonthlystatistics);
