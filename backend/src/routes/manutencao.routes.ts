import { Router } from "express";
import { ManutencaoController } from "../controllers/ManutencaoController";
import { auth } from "../middleware/auth";
import { authorize } from "../middleware/authorize";

const router = Router();

const controller = new ManutencaoController();

/**
 * Registrar manutenção
 */
router.post(
  "/",
  auth,
  authorize(["ADMIN", "TECNICO"]),
  (req, res, next) =>
    controller.criar(req, res, next)
);

/**
 * Listar manutenções
 */
router.get(
  "/",
  auth,
  authorize(["ADMIN", "TECNICO"]),
  (req, res, next) =>
    controller.listar(req, res, next)
);

/**
 * Buscar manutenção por ID
 */
router.get(
  "/:id",
  auth,
  authorize(["ADMIN", "TECNICO"]),
  (req, res, next) =>
    controller.buscar(req, res, next)
);

/**
 * Finalizar manutenção
 */
router.put(
  "/:id/finalizar",
  auth,
  authorize(["ADMIN", "TECNICO"]),
  (req, res, next) =>
    controller.finalizar(req, res, next)
);

/**
 * Remover manutenção
 */
router.delete(
  "/:id",
  auth,
  authorize(["ADMIN"]),
  (req, res, next) =>
    controller.remover(req, res, next)
);

export default router;