import { Router } from "express";
import { ChamadoHistoricoController } from "../controllers/ChamadoHistoricoController";
import { auth, AuthRequest } from "../middleware/auth";

const router = Router();

const controller = new ChamadoHistoricoController();

router.post(
  "/:chamadoId/historico",
  auth,
  (req: AuthRequest, res, next) =>
    controller.criar(req, res, next)
);

router.get(
  "/:chamadoId/historico",
  auth,
  (req: AuthRequest, res, next) =>
    controller.listar(req, res, next)
);

export default router;