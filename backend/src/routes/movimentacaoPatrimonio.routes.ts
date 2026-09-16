import { Router } from "express";
import { MovimentacaoPatrimonioController } from "../controllers/MovimentacaoPatrimonioController";
import { auth } from "../middleware/auth";
import { authorize } from "../middleware/authorize";

const router = Router();

const controller = new MovimentacaoPatrimonioController();


// Criar movimentação
router.post(
  "/",
  auth,
  authorize(["ADMIN", "TECNICO"]),
  (req, res, next) => controller.criar(req, res, next)
);


// Listar movimentações
router.get(
  "/",
  auth,
  authorize(["ADMIN", "TECNICO"]),
  (req, res, next) => controller.listar(req, res, next)
);


// Buscar por ID
router.get(
  "/:id",
  auth,
  authorize(["ADMIN", "TECNICO"]),
  (req, res, next) => controller.buscar(req, res, next)
);


// Remover
router.delete(
  "/:id",
  auth,
  authorize(["ADMIN"]),
  (req, res, next) => controller.remover(req, res, next)

);
// ... suas rotas atuais

/**
 * Remover movimentação
 */
router.delete(
  "/:id",
  auth,
  authorize(["ADMIN"]),
  (req, res, next) =>
    controller.remover(req, res, next)
);


/* ====== ADICIONE AQUI OS 3 NOVOS BLOCOS ====== */


/**
 * Entregar equipamento para funcionário
 */
router.post(
  "/entregar",
  auth,
  authorize(["ADMIN", "TECNICO"]),
  (req, res, next) =>
    controller.entregar(req, res, next)
);


/**
 * Transferir equipamento entre setores
 */
router.post(
  "/transferir",
  auth,
  authorize(["ADMIN", "TECNICO"]),
  (req, res, next) =>
    controller.transferir(req, res, next)
);


/**
 * Devolver equipamento para estoque
 */
router.post(
  "/devolver",
  auth,
  authorize(["ADMIN", "TECNICO"]),
  (req, res, next) =>
    controller.devolver(req, res, next)
);



export default router;
