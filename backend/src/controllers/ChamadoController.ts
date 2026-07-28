import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth";
import { ChamadoService } from "../services/ChamadoService";

const service = new ChamadoService();

export class ChamadoController {

  async criar(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {

      const chamado = await service.criar(req.body);

      return res.status(201).json({
        success: true,
        message: "Chamado criado com sucesso.",
        data: chamado
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

      const chamados = await service.listar();

      return res.status(200).json({
        success: true,
        message: "Chamados listados com sucesso.",
        data: chamados
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

      const chamado = await service.buscarPorId(
        Number(req.params.id)
      );

      if (!chamado) {
        return res.status(404).json({
          success: false,
          message: "Chamado não encontrado."
        });
      }

      return res.status(200).json({
        success: true,
        message: "Chamado encontrado com sucesso.",
        data: chamado
      });

    } catch (error) {
      next(error);
    }
  }

  async atualizar(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {

      const chamado = await service.atualizar(
        Number(req.params.id),
        req.body,
        req.user?.id
      );

      return res.status(200).json({
        success: true,
        message: "Chamado atualizado com sucesso.",
        data: chamado
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
        message: "Chamado removido com sucesso."
      });

    } catch (error) {
      next(error);
    }
  }

}