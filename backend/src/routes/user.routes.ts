import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middleware/auth";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate";
import { createUserSchema } from "../validators/user.validator";

const router = Router();
const userController = new UserController();

router.post(
  "/",
  auth,
  authorize(["ADMIN"]),
  validate(createUserSchema),
  (req, res, next) => userController.create(req, res, next)
);

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