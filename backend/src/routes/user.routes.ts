import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middleware/auth";

const router = Router();
const userController = new UserController();

// Cadastro (temporariamente público)
router.post("/", (req, res) => userController.create(req, res));

// Rota protegida para testar o JWT
router.get("/me", auth, (req, res) => {
  res.json({
    mensagem: "Token válido!",
    usuario: (req as any).user,
  });
});

export default router;