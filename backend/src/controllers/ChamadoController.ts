import { Request, Response, NextFunction } from "express";
import { ChamadoService } from "../services/ChamadoService";

const service = new ChamadoService();

export class ChamadoController {

  async criar(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const chamado = await service.criar(req.body);

      return res.status(201).json(chamado);

    } catch (error) {
      next(error);
    }
  }

  async listar(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const chamados = await service.listar();

      return res.json(chamados);

    } catch (error) {
      next(error);
    }
  }

  async buscar(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const chamado = await service.buscarPorId(
        Number(req.params.id)
      );

      return res.json(chamado);

    } catch (error) {
      next(error);
    }
  }

  async atualizar(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const chamado = await service.atualizar(
        Number(req.params.id),
        req.body
      );

      return res.json(chamado);

    } catch (error) {
      next(error);
    }
  }

  async remover(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await service.remover(
        Number(req.params.id)
      );

      return res.json({
        mensagem: "Chamado removido com sucesso"
      });

    } catch (error) {
      next(error);
    }
  }

}