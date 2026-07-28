import { Router } from "express";
import { SecretariaController } from "../controllers/SecretariaController";
import { auth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { createSecretariaSchema } from "../validators/secretaria.validator";

const router = Router();
const controller = new SecretariaController();

router.post(
  "/",
  auth,
  validate(createSecretariaSchema),
  (req, res, next) => controller.create(req, res, next)
);

router.get(
  "/",
  auth,
  (req, res, next) => controller.list(req, res, next)
);

export default router;
