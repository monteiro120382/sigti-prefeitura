import { Router } from "express";
import { SetorController } from "../controllers/SetorController";
import { auth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { createSetorSchema } from "../validators/setor.validator";

const router = Router();

const controller = new SetorController();

router.post(
  "/",
  auth,
  validate(createSetorSchema),
  (req, res, next) => controller.create(req, res, next)
);

router.get(
  "/",
  auth,
  (req, res, next) => controller.list(req, res, next)
);

router.get(
  "/secretaria/:secretariaId",
  auth,
  (req, res, next) => controller.listBySecretaria(req, res, next)
);

export default router;
