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

      return res.status(201).json({
        success: true,
        message: "Funcionário cadastrado com sucesso.",
        data: funcionario,
      });

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

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const resultado = await service.listar(page, limit);

      return res.status(200).json({
        success: true,
        message: "Funcionários listados com sucesso.",
        data: resultado.data,
        pagination: resultado.pagination,
      });

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

      return res.status(200).json({
        success: true,
        message: "Funcionário encontrado com sucesso.",
        data: funcionario,
      });

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

      return res.status(200).json({
        success: true,
        message: "Funcionário atualizado com sucesso.",
        data: funcionario,
      });

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

      return res.status(200).json({
        success: true,
        message: "Funcionário removido com sucesso.",
      });

    } catch (error) {
      next(error);
    }
  }

}