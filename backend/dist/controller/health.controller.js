"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckController = void 0;
const express_1 = require("express");
const health_route_1 = require("../routes/health.route");
const router = (0, express_1.Router)();
exports.HealthCheckController = router;
router.route("/").get(health_route_1.HealthCheck);
