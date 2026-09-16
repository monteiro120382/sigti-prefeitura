import { Router } from "express";

import {
  RelatorioController
} from "../controllers/RelatorioController";

import { auth } from "../middleware/auth";
import { authorize } from "../middleware/authorize";

const router = Router();

const controller =
  new RelatorioController();


/**
 * Resumo geral dos chamados
 */
router.get(
  "/resumo",
  auth,
  authorize([
    "ADMIN",
    "TECNICO"
  ]),
  (req, res, next) =>
    controller.resumo(
      req,
      res,
      next
    )
);


/**
 * Relatório por técnico
 */
router.get(
  "/por-tecnico",
  auth,
  authorize([
    "ADMIN",
    "TECNICO"
  ]),
  (req, res, next) =>
    controller.porTecnico(
      req,
      res,
      next
    )
);


/**
 * Relatório por secretaria
 */
router.get(
  "/por-secretaria",
  auth,
  authorize([
    "ADMIN",
    "TECNICO"
  ]),
  (req, res, next) =>
    controller.porSecretaria(
      req,
      res,
      next
    )
);


/**
 * Relatório por período
 *
 * Exemplo:
 * /relatorios/por-periodo?dataInicial=2026-08-01&dataFinal=2026-08-25
 */
router.get(
  "/por-periodo",
  auth,
  authorize([
    "ADMIN",
    "TECNICO"
  ]),
  (req, res, next) =>
    controller.porPeriodo(
      req,
      res,
      next
    )
);


/**
 * Chamados recentes
 */
router.get(
  "/recentes",
  auth,
  authorize([
    "ADMIN",
    "TECNICO"
  ]),
  (req, res, next) =>
    controller.recentes(
      req,
      res,
      next
    )
);


export default router;
