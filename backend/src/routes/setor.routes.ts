import { Router } from "express";
import { SetorController } from "../controllers/SetorController";
import { auth } from "../middleware/auth";

const router = Router();
const controller = new SetorController();

router.post("/", auth, (req, res) => controller.create(req, res));

router.get("/", auth, (req, res) => controller.list(req, res));

router.get(
  "/secretaria/:secretariaId",
  auth,
  (req, res) => controller.listBySecretaria(req, res)
);

export default router;
