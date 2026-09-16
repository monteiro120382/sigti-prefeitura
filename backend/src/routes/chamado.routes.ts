import { Router } from "express";
import { ChamadoController } from "../controllers/ChamadoController";
import { auth } from "../middleware/auth";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate";
import { createChamadoSchema } from "../validators/chamado.validator";

const router = Router();
const controller = new ChamadoController();

/**
 * @swagger
 * /chamados:
 *   post:
 *     tags:
 *       - Chamados
 *     summary: Abre um novo chamado
 *     security:
 *       - bearerAuth: []
 */
router.post(
  "/",
  auth,
  authorize([
    "ADMIN",
    "TECNICO",
    "SOLICITANTE",
    "ESTAGIARIO"
  ]),
  validate(createChamadoSchema),
  (req, res, next) =>
    controller.criar(req, res, next)
);

/**
 * @swagger
 * /chamados:
 *   get:
 *     tags:
 *       - Chamados
 *     summary: Lista os chamados
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/",
  auth,
  authorize([
    "ADMIN",
    "TECNICO",
    "SOLICITANTE",
    "ESTAGIARIO"
  ]),
  (req, res, next) =>
    controller.listar(req, res, next)
);

/**
 * @swagger
 * /chamados/{id}:
 *   get:
 *     tags:
 *       - Chamados
 *     summary: Busca um chamado pelo ID
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/:id",
  auth,
  authorize([
    "ADMIN",
    "TECNICO",
    "SOLICITANTE",
    "ESTAGIARIO"
  ]),
  (req, res, next) =>
    controller.buscar(req, res, next)
);

/**
 * @swagger
 * /chamados/{id}:
 *   put:
 *     tags:
 *       - Chamados
 *     summary: Atualiza um chamado
 *     security:
 *       - bearerAuth: []
 */
router.put(
  "/:id",
  auth,
  authorize([
    "ADMIN",
    "TECNICO",
    "ESTAGIARIO"
  ]),
  (req, res, next) =>
    controller.atualizar(req, res, next)
);

/**
 * @swagger
 * /chamados/{id}/atribuir-tecnico:
 *   patch:
 *     tags:
 *       - Chamados
 *     summary: Atribui um técnico ao chamado
 *     security:
 *       - bearerAuth: []
 */
router.patch(
  "/:id/atribuir-tecnico",
  auth,
  authorize(["ADMIN"]),
  (req, res, next) =>
    controller.atribuirTecnico(req, res, next)
);

/**
 * @swagger
 * /chamados/{id}:
 *   delete:
 *     tags:
 *       - Chamados
 *     summary: Remove um chamado
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  auth,
  authorize(["ADMIN"]),
  (req, res, next) =>
    controller.remover(req, res, next)
);

export default router;