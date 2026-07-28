

import { Router } from "express";
import { SetorController } from "../controllers/SetorController";
import { auth } from "../middleware/auth";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate";
import { createSetorSchema } from "../validators/setor.validator";

const router = Router();

const controller = new SetorController();

router.post(
  "/",
  auth,
  authorize(["ADMIN"]),
  validate(createSetorSchema),
  (req, res, next) => controller.create(req, res, next)
);

router.get(
  "/",
  auth,
  authorize(["ADMIN", "TECNICO"]),
  (req, res, next) => controller.list(req, res, next)
);

router.get(
  "/secretaria/:secretariaId",
  auth,
  authorize(["ADMIN", "TECNICO"]),
  (req, res, next) => controller.listBySecretaria(req, res, next)
);

export default router;
