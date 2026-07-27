import { Request, Response, NextFunction } from "express";
import { EquipamentoService } from "../services/EquipamentoService";

const service = new EquipamentoService();

export class EquipamentoController {

  async criar(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const equipamento = await service.criar(req.body);

      return res.status(201).json(equipamento);

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
      const equipamentos = await service.listar();

      return res.json(equipamentos);

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
      const equipamento = await service.buscarPorId(
        Number(req.params.id)
      );

      return res.json(equipamento);

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
      const equipamento = await service.atualizar(
        Number(req.params.id),
        req.body
      );

      return res.json(equipamento);

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
        mensagem: "Equipamento removido com sucesso."
      });

    } catch (error) {
      next(error);
    }
  }

}