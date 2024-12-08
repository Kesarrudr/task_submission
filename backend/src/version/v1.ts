import { Router } from "express";
import { HealthCheckController } from "../controller/health.controller";
import { DataBaseCotroller } from "../controller/database.controller";

const router = Router();

router.use("/health", HealthCheckController);
router.use("/database", DataBaseCotroller);

export { router as V1Route };
