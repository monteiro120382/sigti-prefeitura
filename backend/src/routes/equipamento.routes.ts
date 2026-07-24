import { Router } from "express";
import { EquipamentoController } from "../controllers/EquipamentoController";
import { auth } from "../middleware/auth";

const router = Router();

const controller = new EquipamentoController();

router.post("/", auth, (req, res) => controller.criar(req, res));

router.get("/", auth, (req, res) => controller.listar(req, res));

router.get("/:id", auth, (req, res) => controller.buscar(req, res));

router.put("/:id", auth, (req, res) => controller.atualizar(req, res));

router.delete("/:id", auth, (req, res) => controller.remover(req, res));

export default router;