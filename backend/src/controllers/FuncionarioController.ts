import { Request, Response, NextFunction } from "express";
import { FuncionarioService } from "../services/FuncionarioService";

const service = new FuncionarioService();

export class FuncionarioController {

  async criar(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const funcionario = await service.criar(req.body);

      return res.status(201).json(funcionario);

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
      const funcionarios = await service.listar();

      return res.json(funcionarios);

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
      const funcionario = await service.buscarPorId(
        Number(req.params.id)
      );

      return res.json(funcionario);

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
      const funcionario = await service.atualizar(
        Number(req.params.id),
        req.body
      );

      return res.json(funcionario);

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
        mensagem: "Funcionário removido"
      });

    } catch (error) {
      next(error);
    }
  }

}