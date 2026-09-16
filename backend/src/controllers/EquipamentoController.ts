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

      return res.status(201).json({
        success: true,
        message: "Patrimônio cadastrado com sucesso.",
        data: equipamento
      });

    } catch (error) {
      next(error);
    }
  }

  async importar(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {

      const registros = req.body?.registros;

      if (!Array.isArray(registros)) {
        return res.status(400).json({
          success: false,
          message: "Nenhum registro válido foi enviado para importação."
        });
      }

      const resultado =
        await service.importar(registros);

      return res.status(200).json({
        success: true,
        message: "Processamento da importação concluído.",
        data: resultado
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

      const equipamentos = await service.listar();

      return res.status(200).json({
        success: true,
        message: "Patrimônios listados com sucesso.",
        total: equipamentos.length,
        data: equipamentos
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

      const equipamento = await service.buscarPorId(
        Number(req.params.id)
      );

      return res.status(200).json({
        success: true,
        message: "Patrimônio encontrado com sucesso.",
        data: equipamento
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

      const equipamento = await service.atualizar(
        Number(req.params.id),
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Patrimônio atualizado com sucesso.",
        data: equipamento
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
        message: "Patrimônio removido com sucesso."
      });

    } catch (error) {
      next(error);
    }
  }

}
