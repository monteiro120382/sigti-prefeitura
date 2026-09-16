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
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Cadastra um novo usuário
 *     security:
 *       - bearerAuth: []
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
 * /users:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Lista todos os usuários
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/",
  auth,
  authorize(["ADMIN"]),
  (req, res, next) => userController.list(req, res, next)
);

/**
 * @swagger
 * /users/me:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Retorna o usuário autenticado
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/me",
  auth,
  (req, res) => {
    res.json({
      success: true,
      message: "Token válido.",
      data: (req as any).user
    });
  }
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Busca usuário por ID
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/:id",
  auth,
  authorize(["ADMIN"]),
  (req, res, next) => userController.findById(req, res, next)
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - Usuários
 *     summary: Atualiza um usuário
 *     security:
 *       - bearerAuth: []
 */
router.put(
  "/:id",
  auth,
  authorize(["ADMIN"]),
  (req, res, next) => userController.update(req, res, next)
);

/**
 * @swagger
 * /users/{id}/reset-password:
 *   put:
 *     tags:
 *       - Usuários
 *     summary: Redefine a senha de um usuário
 *     security:
 *       - bearerAuth: []
 */
router.put(
  "/:id/reset-password",
  auth,
  authorize(["ADMIN"]),
  (req, res, next) => userController.resetPassword(req, res, next)
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Usuários
 *     summary: Remove um usuário
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  auth,
  authorize(["ADMIN"]),
  (req, res, next) => userController.delete(req, res, next)
);

export default router;