import { Router } from "express";
import { DashboardController } from "../controllers/DashboardController";
import { auth } from "../middleware/auth";

const router = Router();

const controller = new DashboardController();

router.get("/", auth, (req, res) =>
  controller.resumo(req, res)
);

export default router;