import { Router } from "express";
import { ChamadoController } from "../controllers/ChamadoController";
import { auth } from "../middleware/auth";

const router = Router();
const controller = new ChamadoController();

/**
 * @swagger
 * /chamados:
 *   post:
 *     tags:
 *       - Chamados
 *     summary: Abre um novo chamado
 *     description: Cria um novo chamado de suporte técnico.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descricao
 *               - funcionarioId
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Computador não liga
 *               descricao:
 *                 type: string
 *                 example: O computador não inicializa após queda de energia.
 *               prioridade:
 *                 type: string
 *                 example: ALTA
 *               status:
 *                 type: string
 *                 example: ABERTO
 *               funcionarioId:
 *                 type: integer
 *                 example: 1
 *               equipamentoId:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Chamado criado com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       401:
 *         description: Token inválido ou não informado.
 */
router.post("/", auth, (req, res) => {
  controller.criar(req, res);
});

/**
 * @swagger
 * /chamados:
 *   get:
 *     tags:
 *       - Chamados
 *     summary: Lista todos os chamados
 *     description: Retorna todos os chamados cadastrados.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de chamados.
 */
router.get("/", auth, (req, res) => {
  controller.listar(req, res);
});

/**
 * @swagger
 * /chamados/{id}:
 *   get:
 *     tags:
 *       - Chamados
 *     summary: Busca um chamado pelo ID
 *     description: Retorna um chamado específico.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do chamado.
 *     responses:
 *       200:
 *         description: Chamado encontrado.
 *       404:
 *         description: Chamado não encontrado.
 */
router.get("/:id", auth, (req, res) => {
  controller.buscar(req, res);
});

/**
 * @swagger
 * /chamados/{id}:
 *   put:
 *     tags:
 *       - Chamados
 *     summary: Atualiza um chamado
 *     description: Atualiza os dados de um chamado.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do chamado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Chamado atualizado com sucesso.
 *       404:
 *         description: Chamado não encontrado.
 */
router.put("/:id", auth, (req, res) => {
  controller.atualizar(req, res);
});

/**
 * @swagger
 * /chamados/{id}:
 *   delete:
 *     tags:
 *       - Chamados
 *     summary: Remove um chamado
 *     description: Remove um chamado do sistema.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do chamado.
 *     responses:
 *       200:
 *         description: Chamado removido com sucesso.
 *       404:
 *         description: Chamado não encontrado.
 */
router.delete("/:id", auth, (req, res) => {
  controller.remover(req, res);
});

export default router;