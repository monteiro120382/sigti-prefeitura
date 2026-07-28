import { Router } from "express";
import { EquipamentoController } from "../controllers/EquipamentoController";
import { auth } from "../middleware/auth";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate";
import { createEquipamentoSchema } from "../validators/equipamento.validator";

const router = Router();
const controller = new EquipamentoController();

/**
 * @swagger
 * /equipamentos:
 *   post:
 *     tags:
 *       - Equipamentos
 *     summary: Cadastra um novo equipamento
 *     security:
 *       - bearerAuth: []
 */
router.post(
  "/",
  auth,
  authorize(["ADMIN"]),
  validate(createEquipamentoSchema),
  (req, res, next) => controller.criar(req, res, next)
);

/**
 * @swagger
 * /equipamentos:
 *   get:
 *     tags:
 *       - Equipamentos
 *     summary: Lista todos os equipamentos
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/",
  auth,
  authorize(["ADMIN", "TECNICO"]),
  (req, res, next) => controller.listar(req, res, next)
);

/**
 * @swagger
 * /equipamentos/{id}:
 *   get:
 *     tags:
 *       - Equipamentos
 *     summary: Busca um equipamento pelo ID
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/:id",
  auth,
  authorize(["ADMIN", "TECNICO"]),
  (req, res, next) => controller.buscar(req, res, next)
);

/**
 * @swagger
 * /equipamentos/{id}:
 *   put:
 *     tags:
 *       - Equipamentos
 *     summary: Atualiza um equipamento
 *     security:
 *       - bearerAuth: []
 */
router.put(
  "/:id",
  auth,
  authorize(["ADMIN"]),
  (req, res, next) => controller.atualizar(req, res, next)
);

/**
 * @swagger
 * /equipamentos/{id}:
 *   delete:
 *     tags:
 *       - Equipamentos
 *     summary: Remove um equipamento
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  auth,
  authorize(["ADMIN"]),
  (req, res, next) => controller.remover(req, res, next)
);

export default router;