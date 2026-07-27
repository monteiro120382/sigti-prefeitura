import { Router } from "express";
import { FuncionarioController } from "../controllers/FuncionarioController";

const router = Router();
const controller = new FuncionarioController();

/**
 * @swagger
 * /funcionarios:
 *   post:
 *     tags:
 *       - Funcionários
 *     summary: Cadastra um novo funcionário
 *     description: Cadastra um novo funcionário no sistema.
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
 *               - matricula
 *               - cargo
 *               - email
 *               - telefone
 *               - secretariaId
 *               - setorId
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João da Silva
 *               matricula:
 *                 type: string
 *                 example: 20260001
 *               cargo:
 *                 type: string
 *                 example: Técnico de Informática
 *               email:
 *                 type: string
 *                 example: joao@prefeitura.gov.br
 *               telefone:
 *                 type: string
 *                 example: (21) 99999-9999
 *               secretariaId:
 *                 type: integer
 *                 example: 1
 *               setorId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Funcionário cadastrado com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       401:
 *         description: Token inválido ou não informado.
 */
router.post("/", controller.criar);

/**
 * @swagger
 * /funcionarios:
 *   get:
 *     tags:
 *       - Funcionários
 *     summary: Lista todos os funcionários
 *     description: Retorna todos os funcionários cadastrados.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de funcionários.
 */
router.get("/", controller.listar);

/**
 * @swagger
 * /funcionarios/{id}:
 *   get:
 *     tags:
 *       - Funcionários
 *     summary: Busca um funcionário pelo ID
 *     description: Retorna um funcionário específico.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do funcionário.
 *     responses:
 *       200:
 *         description: Funcionário encontrado.
 *       404:
 *         description: Funcionário não encontrado.
 */
router.get("/:id", controller.buscar);

/**
 * @swagger
 * /funcionarios/{id}:
 *   put:
 *     tags:
 *       - Funcionários
 *     summary: Atualiza um funcionário
 *     description: Atualiza os dados de um funcionário.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do funcionário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Funcionário atualizado com sucesso.
 *       404:
 *         description: Funcionário não encontrado.
 */
router.put("/:id", controller.atualizar);

/**
 * @swagger
 * /funcionarios/{id}:
 *   delete:
 *     tags:
 *       - Funcionários
 *     summary: Remove um funcionário
 *     description: Remove um funcionário do sistema.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do funcionário.
 *     responses:
 *       200:
 *         description: Funcionário removido com sucesso.
 *       404:
 *         description: Funcionário não encontrado.
 */
router.delete("/:id", controller.remover);

export default router;