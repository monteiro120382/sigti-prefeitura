import { Router } from "express";
import { SecretariaController } from "../controllers/SecretariaController";
import { auth } from "../middleware/auth";

const router = Router();
const controller = new SecretariaController();

/**
 * @swagger
 * /secretarias:
 *   post:
 *     tags:
 *       - Secretarias
 *     summary: Cadastra uma nova secretaria
 *     description: Cria uma nova secretaria no sistema.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Secretaria Municipal de Saúde
 *               sigla:
 *                 type: string
 *                 example: SEMUS
 *     responses:
 *       201:
 *         description: Secretaria criada com sucesso.
 *       401:
 *         description: Token inválido ou não informado.
 */
router.post("/", auth, (req, res) => controller.create(req, res));

/**
 * @swagger
 * /secretarias:
 *   get:
 *     tags:
 *       - Secretarias
 *     summary: Lista todas as secretarias
 *     description: Retorna todas as secretarias cadastradas.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de secretarias.
 *       401:
 *         description: Token inválido ou não informado.
 */
router.get("/", auth, (req, res) => controller.list(req, res));

export default router;