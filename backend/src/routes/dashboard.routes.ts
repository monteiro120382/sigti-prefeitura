import { Router } from "express";
import { DashboardController } from "../controllers/DashboardController";
import { auth } from "../middleware/auth";
import { authorize } from "../middleware/authorize";

const router = Router();

const controller = new DashboardController();

/**
 * @swagger
 * /dashboard:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Retorna o resumo do dashboard
 *     description: Retorna indicadores gerais do sistema.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resumo carregado com sucesso.
 *       401:
 *         description: Token inválido ou não informado.
 *       403:
 *         description: Acesso negado.
 */
router.get(
  "/",
  auth,
  authorize(["ADMIN", "TECNICO", "SOLICITANTE"]),
  (req, res, next) => controller.resumo(req, res, next)
);

export default router;