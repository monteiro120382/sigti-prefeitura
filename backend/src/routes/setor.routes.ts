import { Router } from "express";
import { SetorController } from "../controllers/SetorController";
import { auth } from "../middleware/auth";

const router = Router();
const controller = new SetorController();

/**
 * @swagger
 * /setores:
 *   post:
 *     tags:
 *       - Setores
 *     summary: Cadastra um novo setor
 *     description: Cria um novo setor vinculado a uma secretaria.
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
 *               - secretariaId
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Tecnologia da Informação
 *               sigla:
 *                 type: string
 *                 example: TI
 *               secretariaId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Setor criado com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       401:
 *         description: Token inválido ou não informado.
 */
router.post("/", auth, (req, res) => controller.create(req, res));

/**
 * @swagger
 * /setores:
 *   get:
 *     tags:
 *       - Setores
 *     summary: Lista todos os setores
 *     description: Retorna todos os setores cadastrados.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de setores.
 *       401:
 *         description: Token inválido ou não informado.
 */
router.get("/", auth, (req, res) => controller.list(req, res));

/**
 * @swagger
 * /setores/secretaria/{secretariaId}:
 *   get:
 *     tags:
 *       - Setores
 *     summary: Lista setores por secretaria
 *     description: Retorna todos os setores vinculados a uma secretaria.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: secretariaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da secretaria.
 *     responses:
 *       200:
 *         description: Lista de setores da secretaria.
 *       401:
 *         description: Token inválido ou não informado.
 *       404:
 *         description: Secretaria não encontrada.
 */
router.get(
  "/secretaria/:secretariaId",
  auth,
  (req, res) => controller.listBySecretaria(req, res)
);

export default router;