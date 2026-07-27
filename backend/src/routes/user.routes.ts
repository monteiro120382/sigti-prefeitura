import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middleware/auth";
import { authorize } from "../middleware/authorize";

const router = Router();
const userController = new UserController();

// Apenas ADMIN pode criar usuários
router.post(
  "/",
  auth,
  authorize(["ADMIN"]),
  (req, res) => userController.create(req, res)
);

// Apenas ADMIN pode visualizar seus dados
router.get(
  "/me",
  auth,
  authorize(["ADMIN"]),
  (req, res) => {
    res.json({
      mensagem: "Token válido!",
      usuario: (req as any).user,
    });
  }
);

export default router;