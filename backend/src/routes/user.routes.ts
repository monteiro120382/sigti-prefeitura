import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middleware/auth";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate";
import { createUserSchema } from "../validators/user.validator";

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Cadastra um novo usuário
 *     description: Apenas usuários com perfil ADMIN podem cadastrar novos usuários.
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
 *               - email
 *               - senha
 *               - perfil
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Maria Souza
 *               email:
 *                 type: string
 *                 example: maria@sigti.local
 *               senha:
 *                 type: string
 *                 example: 123456
 *               perfil:
 *                 type: string
 *                 enum:
 *                   - ADMIN
 *                   - TECNICO
 *                   - SOLICITANTE
 *                 example: TECNICO
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       401:
 *         description: Não autenticado.
 *       403:
 *         description: Acesso negado.
 */
router.post(
  "/",
  auth,
  authorize(["ADMIN"]),
  validate(createUserSchema),
  (req, res, next) => userController.create(req, res, next)
);

/**
 * @swagger
 * /users/me:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Retorna os dados do usuário autenticado
 *     description: Valida o token JWT e retorna os dados presentes no token.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token válido.
 *       401:
 *         description: Token inválido ou não informado.
 */
router.get(
  "/me",
  auth,
  (req, res) => {
    res.json({
      mensagem: "Token válido!",
      usuario: (req as any).user,
    });
  }
);

export default router;