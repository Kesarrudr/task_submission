import { Router } from "express";
import { HealthCheck } from "../routes/health.route";

const router = Router();

router.route("/").get(HealthCheck);

export { router as HealthCheckController };
