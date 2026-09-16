import { Request, Response, NextFunction } from "express";
import { MovimentacaoPatrimonioService } from "../services/MovimentacaoPatrimonioService";

const service = new MovimentacaoPatrimonioService();

export class MovimentacaoPatrimonioController {


  async criar(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const movimentacao = await service.criar(req.body);

      return res.status(201).json({
        success: true,
        message: "Movimentação registrada com sucesso.",
        data: movimentacao
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

      const movimentacoes = await service.listar();

      return res.status(200).json({
        success: true,
        message: "Movimentações listadas com sucesso.",
        data: movimentacoes
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

      const movimentacao = await service.buscarPorId(
        Number(req.params.id)
      );


      if (!movimentacao) {
        return res.status(404).json({
          success: false,
          message: "Movimentação não encontrada."
        });
      }


      return res.status(200).json({
        success: true,
        message: "Movimentação encontrada.",
        data: movimentacao
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
        message: "Movimentação removida com sucesso."
      });


    } catch (error) {
      next(error);
    }

  }



  async entregar(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const movimentacao = await service.entregar(req.body);

      return res.status(201).json({
        success: true,
        message: "Equipamento entregue com sucesso.",
        data: movimentacao
      });

    } catch (error) {
      next(error);
    }

  }



  async transferir(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const movimentacao = await service.transferir(req.body);

      return res.status(201).json({
        success: true,
        message: "Equipamento transferido com sucesso.",
        data: movimentacao
      });

    } catch (error) {
      next(error);
    }

  }



  async devolver(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const movimentacao = await service.devolver(req.body);

      return res.status(201).json({
        success: true,
        message: "Equipamento devolvido ao estoque.",
        data: movimentacao
      });

    } catch (error) {
      next(error);
    }

  }


}
