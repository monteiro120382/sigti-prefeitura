import { Router } from "express";
import { ChamadoController } from "../controllers/ChamadoController";
import { auth } from "../middleware/auth";
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
  validate(createChamadoSchema),
  (req, res, next) => controller.criar(req, res, next)
);

/**
 * @swagger
 * /chamados:
 *   get:
 *     tags:
 *       - Chamados
 *     summary: Lista todos os chamados
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/",
  auth,
  (req, res, next) => controller.listar(req, res, next)
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
  (req, res, next) => controller.buscar(req, res, next)
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
  (req, res, next) => controller.atualizar(req, res, next)
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
  (req, res, next) => controller.remover(req, res, next)
);

export default router;