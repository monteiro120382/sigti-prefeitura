import { Router } from "express";
import { EquipamentoController } from "../controllers/EquipamentoController";
import { auth } from "../middleware/auth";

const router = Router();
const controller = new EquipamentoController();

/**
 * @swagger
 * /equipamentos:
 *   post:
 *     tags:
 *       - Equipamentos
 *     summary: Cadastra um novo equipamento
 *     description: Cadastra um novo equipamento no sistema.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patrimonio
 *               - tipo
 *               - marca
 *               - modelo
 *             properties:
 *               patrimonio:
 *                 type: string
 *                 example: PAT-000123
 *               tipo:
 *                 type: string
 *                 example: Notebook
 *               marca:
 *                 type: string
 *                 example: Dell
 *               modelo:
 *                 type: string
 *                 example: Latitude 5420
 *               numeroSerie:
 *                 type: string
 *                 example: ABC123XYZ
 *               funcionarioId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Equipamento cadastrado com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       401:
 *         description: Token inválido ou não informado.
 */
router.post("/", auth, (req, res) => controller.criar(req, res));

/**
 * @swagger
 * /equipamentos:
 *   get:
 *     tags:
 *       - Equipamentos
 *     summary: Lista todos os equipamentos
 *     description: Retorna todos os equipamentos cadastrados.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de equipamentos.
 */
router.get("/", auth, (req, res) => controller.listar(req, res));

/**
 * @swagger
 * /equipamentos/{id}:
 *   get:
 *     tags:
 *       - Equipamentos
 *     summary: Busca um equipamento pelo ID
 *     description: Retorna um equipamento específico.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do equipamento.
 *     responses:
 *       200:
 *         description: Equipamento encontrado.
 *       404:
 *         description: Equipamento não encontrado.
 */
router.get("/:id", auth, (req, res) => controller.buscar(req, res));

/**
 * @swagger
 * /equipamentos/{id}:
 *   put:
 *     tags:
 *       - Equipamentos
 *     summary: Atualiza um equipamento
 *     description: Atualiza os dados de um equipamento.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do equipamento.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Equipamento atualizado com sucesso.
 *       404:
 *         description: Equipamento não encontrado.
 */
router.put("/:id", auth, (req, res) => controller.atualizar(req, res));

/**
 * @swagger
 * /equipamentos/{id}:
 *   delete:
 *     tags:
 *       - Equipamentos
 *     summary: Remove um equipamento
 *     description: Remove um equipamento do sistema.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do equipamento.
 *     responses:
 *       200:
 *         description: Equipamento removido com sucesso.
 *       404:
 *         description: Equipamento não encontrado.
 */
router.delete("/:id", auth, (req, res) => controller.remover(req, res));

export default router;