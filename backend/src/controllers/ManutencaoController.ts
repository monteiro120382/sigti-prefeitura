import { Request, Response, NextFunction } from "express";
import { ManutencaoService } from "../services/ManutencaoService";

const service = new ManutencaoService();

export class ManutencaoController {

  async criar(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const manutencao = await service.criar(req.body);

      return res.status(201).json({
        success: true,
        message: "Manutenção registrada com sucesso.",
        data: manutencao
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

      const manutencoes = await service.listar();

      return res.status(200).json({
        success: true,
        message: "Manutenções listadas com sucesso.",
        data: manutencoes
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

      const manutencao = await service.buscarPorId(
        Number(req.params.id)
      );

      if (!manutencao) {
        return res.status(404).json({
          success: false,
          message: "Manutenção não encontrada."
        });
      }

      return res.status(200).json({
        success: true,
        message: "Manutenção encontrada.",
        data: manutencao
      });

    } catch (error) {
      next(error);
    }

  }


  async finalizar(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const manutencao = await service.finalizar(
        Number(req.params.id),
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Manutenção finalizada com sucesso.",
        data: manutencao
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
        message: "Manutenção removida com sucesso."
      });

    } catch (error) {
      next(error);
    }

  }

}