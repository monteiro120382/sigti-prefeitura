import { Router } from "express";
import { FuncionarioController } from "../controllers/FuncionarioController";
import { auth } from "../middleware/auth";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate";
import { createFuncionarioSchema } from "../validators/funcionario.validator";

const router = Router();

const controller = new FuncionarioController();

router.post(
  "/",
  auth,
  authorize(["ADMIN"]),
  validate(createFuncionarioSchema),
  (req, res, next) => controller.criar(req, res, next)
);

router.get(
  "/",
  auth,
  authorize(["ADMIN", "TECNICO"]),
  (req, res, next) => controller.listar(req, res, next)
);

router.get(
  "/:id",
  auth,
  authorize(["ADMIN", "TECNICO"]),
  (req, res, next) => controller.buscar(req, res, next)
);

router.put(
  "/:id",
  auth,
  authorize(["ADMIN"]),
  (req, res, next) => controller.atualizar(req, res, next)
);

router.delete(
  "/:id",
  auth,
  authorize(["ADMIN"]),
  (req, res, next) => controller.remover(req, res, next)
);

export default router;