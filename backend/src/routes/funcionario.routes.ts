import { Router } from "express";
import { FuncionarioController } from "../controllers/FuncionarioController";

const router = Router();

const controller = new FuncionarioController();

router.post("/", controller.criar);

router.get("/", controller.listar);

router.get("/:id", controller.buscar);

router.put("/:id", controller.atualizar);

router.delete("/:id", controller.remover);

export default router;
