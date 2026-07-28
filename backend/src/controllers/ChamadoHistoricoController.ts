import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth";
import { ChamadoHistoricoService } from "../services/ChamadoHistoricoService";

const service = new ChamadoHistoricoService();

export class ChamadoHistoricoController {

  async criar(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {

      const historico = await service.criar({
        chamadoId: Number(req.params.chamadoId),
        statusAnterior: req.body.statusAnterior,
        statusNovo: req.body.statusNovo,
        observacao: req.body.observacao,
        usuarioId: req.user?.id
      });

      return res.status(201).json({
        success: true,
        message: "Histórico registrado com sucesso.",
        data: historico
      });

    } catch (error) {
      next(error);
    }
  }

  async listar(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {

      const historicos = await service.listarPorChamado(
        Number(req.params.chamadoId)
      );

      return res.status(200).json({
        success: true,
        message: "Histórico carregado com sucesso.",
        data: historicos
      });

    } catch (error) {
      next(error);
    }
  }

  async buscar(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {

      const historico = await service.buscarPorId(
        Number(req.params.id)
      );

      if (!historico) {
        return res.status(404).json({
          success: false,
          message: "Histórico não encontrado."
        });
      }

      return res.status(200).json({
        success: true,
        message: "Histórico encontrado com sucesso.",
        data: historico
      });

    } catch (error) {
      next(error);
    }
  }

  async remover(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {

      await service.remover(
        Number(req.params.id)
      );

      return res.status(200).json({
        success: true,
        message: "Histórico removido com sucesso."
      });

    } catch (error) {
      next(error);
    }
  }

}
