import { Router } from "express";
import { SecretariaController } from "../controllers/SecretariaController";
import { auth } from "../middleware/auth";

const router = Router();
const controller = new SecretariaController();

router.post("/", auth, (req, res) => controller.create(req, res));

router.get("/", auth, (req, res) => controller.list(req, res));

export default router;
